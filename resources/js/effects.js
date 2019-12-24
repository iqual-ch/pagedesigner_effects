


(function ($, Drupal) {



  Drupal.behaviors.pagedesigner_effects = {
    attach: function (context, settings) {

      // drupalSettings.pagedesigner.effects = {
      //   '#pd-cp-6014' : [
      //     {'event':'scrollentertop','target':null,'offset':0,'effect':'animated slideInLeft','state_before':'hide','state_after':'show'},
      //     {'event':'scrollleavetop','target':null,'offset':0,'effect':'animated slideOutLeft','state_after':'hide'},
      //     {'event':'scrollleavebottom','target':null,'offset':0,'effect':'animated slideOutRight','state_after':'hide'},
      //     {'event':'scrollenterbottom','target':null,'offset':0,'effect':'animated slideInRight','state_after':'hide','state_after':'show'}],
      //   // '#pd-cp-2460' : [
      //   //   {'event':'scrollentertop','target':null,'offset':0,'effect':'animated wobble'}],
      //   '#pd-cp-2575' : [
      //     {'event':'scrollleavetop','target':'#pd-cp-2542','offset':0,'effect':'animated hinge'}],
      //   '#pd-cp-2533' : [
      //     {'event':'scrollleavebottom','target':null,'offset':0,'effect':'animated shake'}],
      //   '#pd-cp-2581' : [
      //     {'event':'scrollenterbottom','target':null,'offset':0,'effect':'animated heartBeat'}],
      //   '#pd-cp-6030' : [
      //     {'event':'mouseenter','target':null,'offset':0,'effect':'animated heartBeat'},
      //     {'event':'mouseleave','target':'body','offset':0,'effect':'animated heartBeat'}],
      //   '#pd-cp-6045' : [
      //     {'event':'mousehover','target':null,'offset':0,'effect':'pd-hover-grow'}],

      //   '#pd-cp-2542' : [
      //     {'event':'scroll','target':null,'offset':0,'x_start':'-50%','x_end':'0','y_start':'50%','y_end':'0', 'duration': 'trigger_height', 'offset': 50 }],


      //     '#pd-cp-2533' : [
      //       {'event':'scroll','target':'#pd-cp-2550','offset':0,'x_start':'100%','x_end':'-100%', 'duration': 'trigger_left' }],

      //     '#pd-cp-2533' : [
      //       {'event':'scroll','target':'#pd-cp-2550','offset':0,'x_start':'100%','x_end':'-100%', 'duration': 'trigger_height' }],


      //     '#pd-cp-6059' : [
      //       {'event':'scroll','target':'#pd-cp-2463','offset':0,'y_start':'-300%','y_end':0, 'duration': 'trigger_left' },
      //       {'event':'scroll','target':'#pd-cp-2464','offset':0,'y_start':'-240%','y_end':0, 'duration': 'trigger_left' },
      //       {'event':'scroll','target':'#pd-cp-2465','offset':0,'y_start':'-280%','y_end':0, 'duration': 'trigger_left' },
      //       {'event':'scroll','target':'#pd-cp-2466','offset':0,'y_start':'-240%','y_end':0, 'duration': 'trigger_left' },
      //       {'event':'scroll','target':'#pd-cp-2467','offset':0,'y_start':'-320%','y_end':0, 'duration': 'trigger_left' },
      //       {'event':'scroll','target':'#pd-cp-2468','offset':0,'y_start':'-200%','y_end':0, 'duration': 'trigger_left' }],

      //     // '#main' : [
      //     //   {'event':'scroll','target':'#main','offset':0,'y_start':'0','y_end':'100%', 'duration': 'trigger_height' }]

      // }



      window.animationController = new ScrollMagic.Controller();

      if (drupalSettings && drupalSettings.pagedesigner && drupalSettings.pagedesigner.effects) {
        Object.keys(drupalSettings.pagedesigner.effects).forEach(function (trigger) {

          var effects = drupalSettings.pagedesigner.effects[trigger];
          effects.forEach(function (effect) {

            // get target
            if (effect['target']) {
              var target = effect['target'];
            } else {
              var target = trigger;
            }

            switch (effect.event) {
              case 'mouseenter':
                $(trigger).mouseenter(function () {
                  $(target).addClass('animated ' + effect['effect']);
                  setTimeout(function () {
                    $(target).removeClass('animated ' + effect['effect']);
                  }, 1000);
                });
                break;

              case 'mouseleave':
                $(trigger).mouseleave(function () {
                  $(target).addClass('animated ' + effect['effect']);
                  setTimeout(function () {
                    $(target).removeClass('animated ' + effect['effect']);
                  }, 1000);
                });
                break;

              case 'mousehover':

                $(target).addClass(effect['effect'])
                $(trigger).mouseenter(function () {
                  $(target).addClass('active');
                }).mouseleave(function () {
                  $(target).removeClass('active');
                });
                break;




              case 'scrollentertop':
              case 'scrollleavetop':
              case 'scrollleavebottom':
              case 'scrollenterbottom':
                var scene = new ScrollMagic.Scene({ triggerElement: trigger });
                //              scene.addIndicators();

                var duration = 1;

                // state before
                switch (effect['state_before']) {
                  case 'hide':
                    scene.on('add', function (event) {
                      $(target).addClass('pd-hidden');
                    });
                    break;

                  case 'hide':
                    scene.on('add', function (event) {
                      $(target).removeClass('pd-hidden');
                    });
                    break;
                }

                scene.on('leave', function (event) {
                  setTimeout(function () {
                    $(target).removeClass('animated ' + effect['effect']);
                  }, 1000);
                });


                // define action
                switch (effect.event) {
                  case 'scrollentertop':
                    var offset = 0;
                    if (effect['offset']) {
                      offset -= parseInt(effect['offset']);
                    }

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "FORWARD") {
                        $(target).removeClass('pd-hidden');
                        $(target).addClass('animated ' + effect['effect']);
                      }
                    });

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "REVERSE") {
                        $(target).removeClass('animated ' + effect['effect']);
                      }
                    });

                    // state after
                    switch (effect['state_after']) {
                      case 'hide':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "FORWARD") {
                            $(target).addClass('pd-hidden');
                          }
                        });
                        break;

                      case 'show':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "FORWARD") {
                            $(target).removeClass('pd-hidden');
                          }
                        });
                        break;
                    }


                    break;

                  case 'scrollleavetop':
                    var offset = -10;
                    if (effect['offset']) {
                      offset -= parseInt(effect['offset']);
                    }

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "REVERSE") {
                        $(target).removeClass('pd-hidden');
                        $(target).addClass('animated ' + effect['effect']);
                      }
                    });

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "FORWARD") {
                        $(target).removeClass('animated ' + effect['effect']);
                      }
                    });


                    // state after
                    switch (effect['state_after']) {
                      case 'hide':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "REVERSE") {
                            $(target).addClass('pd-hidden');
                          }
                        });
                        break;

                      case 'show':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "REVERSE") {
                            $(target).removeClass('pd-hidden');
                          }
                        });
                        break;
                    }

                    break;

                  case 'scrollleavebottom':
                    var offset = parseInt($(trigger).height());
                    if (effect['offset']) {
                      offset -= parseInt(effect['offset']);
                    }

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "FORWARD") {
                        $(target).removeClass('pd-hidden');
                        $(target).addClass('animated ' + effect['effect']);
                      }
                    });

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "REVERSE") {
                        $(target).removeClass('animated ' + effect['effect']);
                      }
                    });

                    // state after
                    switch (effect['state_after']) {
                      case 'hide':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "FORWARD") {
                            $(target).addClass('pd-hidden');
                          }
                        });
                        break;

                      case 'show':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "FORWARD") {
                            $(target).removeClass('pd-hidden');
                          }
                        });
                        break;
                    }

                    break;


                  case 'scrollenterbottom':
                    var offset = parseInt($(trigger).height()) - 10;
                    if (effect['offset']) {
                      offset -= parseInt(effect['offset']);
                    }

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "REVERSE") {
                        $(target).removeClass('pd-hidden');
                        $(target).addClass('animated ' + effect['effect']);
                      }
                    });

                    scene.on('enter', function (event) {
                      if (event.scrollDirection == "FORWARD") {
                        $(target).removeClass('animated ' + effect['effect']);
                      }
                    });

                    // state after
                    switch (effect['state_after']) {
                      case 'hide':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "REVERSE") {
                            $(target).addClass('pd-hidden');
                          }
                        });
                        break;

                      case 'show':
                        scene.on('leave', function (event) {
                          if (event.scrollDirection == "REVERSE") {
                            $(target).removeClass('pd-hidden');
                          }
                        });
                        break;
                    }

                    break;
                };

                scene.offset(offset);
                scene.duration(duration);
                scene.addTo(window.animationController);

                break;

              case 'scroll':
                // parallax
                var TL = new TimelineMax();

                var paramsStart = { ease: Linear.easeNone, x: 0, y: 0 };
                if (effect.x_start) {
                  paramsStart.x = effect.x_start;
                }
                if (effect.y_start) {
                  paramsStart.y = effect.y_start;
                }

                var paramsEnd = { ease: Linear.easeNone, x: 0, y: 0 };
                if (effect.x_end) {
                  paramsEnd.x = effect.x_end;
                }
                if (effect.y_end) {
                  paramsEnd.y = effect.y_end;
                }

                TL.from(target, 1, paramsStart, 0);
                TL.to(target, 1, paramsEnd, 0);

                var duration = 0;
                switch (effect.duration) {
                  case 'trigger_height':
                    duration = $(trigger).height();
                    break;
                  case 'trigger_leave':
                    duration = '100%';
                    break;
                  case 'trigger_left':
                    duration = $(window).height() + $(trigger).height();
                    break;
                }

                var offset = 0;
                if (effect['offset']) {
                  offset += parseInt(effect['offset']);
                }

                // tutorial
                var scene = new ScrollMagic.Scene({
                  triggerElement: trigger,
                  duration: duration,
                  offset: offset,
                  triggerHook: 1
                })
                  //              .addIndicators()
                  .setTween(TL)
                  .addTo(animationController);





                break;


              case 'pin':
                var duration = 0;
                switch (effect.duration) {
                  case 'trigger_height':
                    duration = $(trigger).height();
                    break;
                  case 'trigger_leave':
                    duration = '100%';
                    break;
                  case 'trigger_left':
                    duration = $(window).height() + $(trigger).height();
                    break;
                }

                var scene = new ScrollMagic.Scene({
                  triggerElement: trigger,
                  duration: duration
                })
                  .setPin(target)
                  //                .addIndicators() // add indicators (requires plugin)
                  .addTo(animationController);

                break;

            }

          });
        });
      }
    }
  }

})(jQuery, Drupal);
