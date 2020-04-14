


(function ($, Drupal) {



  Drupal.behaviors.pagedesigner_effects = {
    attach: function (context, settings) {
      window.animationController = new ScrollMagic.Controller();

      if (drupalSettings && drupalSettings.pagedesigner && drupalSettings.pagedesigner.effects) {
        Object.keys(drupalSettings.pagedesigner.effects).forEach(function (trigger) {

          var effects = drupalSettings.pagedesigner.effects[trigger];
          if (!effects) {
            return;
          }
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

                // state before
                switch (effect['state_before']) {
                  case 'hide':
                    $(target).addClass('pd-hidden');
                    break;

                  case 'show':
                    $(target).removeClass('pd-hidden');
                    break;
                }

                // state after
                switch (effect['state_after']) {
                  case 'hide':
                    $(trigger).click(function () {
                      $(target).addClass('pd-hidden');
                      $(target).removeClass('animated');
                    });
                    break;

                  case 'show':
                    $(trigger).click(function () {
                      $(target).removeClass('pd-hidden');
                    });
                    break;
                }

                break;

              case 'mouseleave':
                $(trigger).mouseleave(function () {
                  $(target).addClass('animated ' + effect['effect']);
                  setTimeout(function () {
                    $(target).removeClass('animated ' + effect['effect']);
                  }, 1000);
                });

                // state before
                switch (effect['state_before']) {
                  case 'hide':
                    $(target).addClass('pd-hidden');
                    break;

                  case 'show':
                    $(target).removeClass('pd-hidden');
                    break;
                }

                // state after
                switch (effect['state_after']) {
                  case 'hide':
                    $(trigger).click(function () {
                      $(target).addClass('pd-hidden');
                      $(target).removeClass('animated');
                    });
                    break;

                  case 'show':
                    $(trigger).click(function () {
                      $(target).removeClass('pd-hidden');
                    });
                    break;
                }

                break;

              case 'mousehover':

                $(target).addClass(effect['effect'])
                $(trigger).mouseenter(function () {
                  $(target).addClass('active');
                }).mouseleave(function () {
                  $(target).removeClass('active');
                });
                break;

              case 'click':
                $(trigger).addClass('pd-clickable');
                $(trigger).click(function () {
                  if (effect['effect']) {
                    $(target).addClass('animated ' + effect['effect']);
                    setTimeout(function () {
                      $(target).removeClass('animated ' + effect['effect']);
                    }, 1000);
                  }
                });

                // state before
                switch (effect['state_before']) {
                  case 'hide':
                    $(target).addClass('pd-hidden');
                    break;

                  case 'show':
                    $(target).removeClass('pd-hidden');
                    break;
                }

                // state after
                switch (effect['state_after']) {
                  case 'hide':
                    $(trigger).click(function () {
                      $(target).addClass('pd-hidden');
                      $(target).removeClass('animated');
                    });
                    break;

                  case 'show':
                    $(trigger).click(function () {
                      $(target).removeClass('pd-hidden');
                    });
                    break;
                }

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

                  case 'show':
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
