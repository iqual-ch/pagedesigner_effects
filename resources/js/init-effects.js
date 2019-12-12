class PagedesignerEffectHandler {

  /**
   * Construct a new Pagedesigner Media Manager.
   * Also, initializes the default media trait.
   *
   * @param {Object} editor
   * @param {Object} jQuery
   * @param {Object} settings
   */
  constructor(editor, jQuery, settings) {
    this.editor = editor;
    this.jQuery = jQuery;
    this.settings = settings;

    $ = this.jQuery;

    this.events = this.loadEvents();

  }

  loadEvents(){
    var events = [];
    var effects = this.settings.effects;
    Object.keys(effects.categories).forEach(category=>{
      effects.categories[category].events.forEach( element =>{
        events[element] = {
          'event' : element,
          'fields' : effects.categories[category].fields
        };
      })
    });
    return events;
  }

  init(){

    if ($('.gjs-clm-effects').length == 0) {
      var effect_container =  $('<div class="gjs-clm-effects gjs-one-bg gjs-two-color" ><div data-effects-container></div></div>');
      effect_container.prepend( this.btnAddEvent() );
      effect_container.prepend( $('<p class="sidebar-subtitle">' + Drupal.t('Effects / Anmations') + '</p>') );
      effect_container.insertBefore('.gjs-clm-tags');
    }
  }


  btnAddEvent(){
    self = this;
    var markup = '<select class="add-effect"><option value="">' + Drupal.t('Add effect / animation') + '</option>';
    Object.keys(this.events).forEach( element =>{
      markup += '<option value="' + element + '">' + element + '</option>';
    })
    var btn = this.jQuery(markup);

    btn.on('change', function () {
      self.addEffect($(this).val());
      $(this).find('option').first().attr("selected", true);
      $(this).find('option').first().removeAttr("selected");
    });

    return btn;
  }

  addEffect(event){


    if( !editor.getSelected().attributes.effects ){
      editor.getSelected().attributes.effects = [];
    }

    var effect = {
      'event' : event
    };



    this.formEditEffect(effect);
    editor.getSelected().attributes.effects.push(effect);

  }

  formEditEffect(effect){
    console.log( this.events[effect.event].fields )
  }

}







(function ($, Drupal) {
  Drupal.behaviors.pagedesigner_init_component_effects = {
    attach: function (context, settings) {
      $(document).on('pagedesigner-after-init', function (e, editor, options) {
        editor.on('component:selected', (component, sender) => {
          var pagedeisnger_effect_handler = new PagedesignerEffectHandler(editor, jQuery, drupalSettings.pagedesigner_effects);
          pagedeisnger_effect_handler.init();

        });

      });

    }
  };
})(jQuery, Drupal);



// jQuery(document).on('click', '[data-add-animation]', function(){
//   var animation_options_html = '';
//   animation_options_html += '<div class="options-holder animation-holder">';
//   animation_options_html += '<p>Event</p>';
//   animation_options_html += '<select name="event">';
//   animation_options_html += '<option value="mousehover">Mouse hover</option>';
//   animation_options_html += '<option value="mouseenter">Mouse enter</option>';
//   animation_options_html += '<option value="mouseleave">Mouse leave</option>';
//   animation_options_html += '<option value="scrollentertop">Scroll enter (from top)</option>';
//   animation_options_html += '<option value="scrollenterbottom">Scroll enter (from bottom)</option>';
//   animation_options_html += '<option value="scrollleavetop">Scroll leave (top)</option>';
//   animation_options_html += '<option value="scrollleavebottom">Scroll leave (bottom)</option>';
//   animation_options_html += '<option value="scroll">Scroll</option>';
//   animation_options_html += '<option value="scrollup">Scroll up</option>';
//   animation_options_html += '<option value="scrolldown">Scroll down</option>';
//   animation_options_html += '</select>';

//   animation_options_html += '<p>Target</p>';
//   animation_options_html += '<input type="text" name="target"/>';


//   animation_options_html += '<p>Offset before</p>';
//   animation_options_html += '<input type="number" name="offset-before"/>';

//   animation_options_html += '<p>Offset after</p>';
//   animation_options_html += '<input type="number" name="offset-after"/>';

//   animation_options_html += '<p>Effect</p>';
//   animation_options_html += '<select name="effect">\
//     <optgroup label="Attention Seekers">\
//       <option value="bounce">bounce</option>\
//       <option value="flash">flash</option>\
//       <option value="pulse">pulse</option>\
//       <option value="rubberBand">rubberBand</option>\
//       <option value="shake">shake</option>\
//       <option value="swing">swing</option>\
//       <option value="tada">tada</option>\
//       <option value="wobble">wobble</option>\
//       <option value="jello">jello</option>\
//       <option value="heartBeat">heartBeat</option>\
//     </optgroup>\
//     <optgroup label="Bouncing Entrances">\
//       <option value="animate bounceIn">bounceIn</option>\
//       <option value="animate bounceInDown">bounceInDown</option>\
//       <option value="animate bounceInLeft">bounceInLeft</option>\
//       <option value="animate bounceInRight">bounceInRight</option>\
//       <option value="animate bounceInUp">bounceInUp</option>\
//     </optgroup>\
//     <optgroup label="Bouncing Exits">\
//       <option value="animate bounceOut">bounceOut</option>\
//       <option value="animate bounceOutDown">bounceOutDown</option>\
//       <option value="animate bounceOutLeft">bounceOutLeft</option>\
//       <option value="animate bounceOutRight">bounceOutRight</option>\
//       <option value="animate bounceOutUp">bounceOutUp</option>\
//     </optgroup>\
//     <optgroup label="Fading Entrances">\
//       <option value="animate fadeIn">fadeIn</option>\
//       <option value="animate fadeInDown">fadeInDown</option>\
//       <option value="animate fadeInDownBig">fadeInDownBig</option>\
//       <option value="animate fadeInLeft">fadeInLeft</option>\
//       <option value="animate fadeInLeftBig">fadeInLeftBig</option>\
//       <option value="animate fadeInRight">fadeInRight</option>\
//       <option value="animate fadeInRightBig">fadeInRightBig</option>\
//       <option value="animate fadeInUp">fadeInUp</option>\
//       <option value="animate fadeInUpBig">fadeInUpBig</option>\
//     </optgroup>\
//     <optgroup label="Fading Exits">\
//       <option value="animate fadeOut">fadeOut</option>\
//       <option value="animate fadeOutDown">fadeOutDown</option>\
//       <option value="animate fadeOutDownBig">fadeOutDownBig</option>\
//       <option value="animate fadeOutLeft">fadeOutLeft</option>\
//       <option value="animate fadeOutLeftBig">fadeOutLeftBig</option>\
//       <option value="animate fadeOutRight">fadeOutRight</option>\
//       <option value="animate fadeOutRightBig">fadeOutRightBig</option>\
//       <option value="animate fadeOutUp">fadeOutUp</option>\
//       <option value="animate fadeOutUpBig">fadeOutUpBig</option>\
//     </optgroup>\
//     <optgroup label="Flippers">\
//       <option value="animate flip">flip</option>\
//       <option value="animate flipInX">flipInX</option>\
//       <option value="animate flipInY">flipInY</option>\
//       <option value="animate flipOutX">flipOutX</option>\
//       <option value="animate flipOutY">flipOutY</option>\
//     </optgroup>\
//     <optgroup label="Lightspeed">\
//       <option value="animate lightSpeedIn">lightSpeedIn</option>\
//       <option value="animate lightSpeedOut">lightSpeedOut</option>\
//     </optgroup>\
//     <optgroup label="Rotating Entrances">\
//       <option value="animate rotateIn">rotateIn</option>\
//       <option value="animate rotateInDownLeft">rotateInDownLeft</option>\
//       <option value="animate rotateInDownRight">rotateInDownRight</option>\
//       <option value="animate rotateInUpLeft">rotateInUpLeft</option>\
//       <option value="animate rotateInUpRight">rotateInUpRight</option>\
//     </optgroup>\
//     <optgroup label="Rotating Exits">\
//       <option value="animate rotateOut">rotateOut</option>\
//       <option value="animate rotateOutDownLeft">rotateOutDownLeft</option>\
//       <option value="animate rotateOutDownRight">rotateOutDownRight</option>\
//       <option value="animate rotateOutUpLeft">rotateOutUpLeft</option>\
//       <option value="animate rotateOutUpRight">rotateOutUpRight</option>\
//     </optgroup>\
//     <optgroup label="Sliding Entrances">\
//       <option value="animate slideInUp">slideInUp</option>\
//       <option value="animate slideInDown">slideInDown</option>\
//       <option value="animate slideInLeft">slideInLeft</option>\
//       <option value="animate slideInRight">slideInRight</option>\
//     </optgroup>\
//     <optgroup label="Sliding Exits">\
//       <option value="animate slideOutUp">slideOutUp</option>\
//       <option value="animate slideOutDown">slideOutDown</option>\
//       <option value="animate slideOutLeft">slideOutLeft</option>\
//       <option value="animate slideOutRight">slideOutRight</option>\
//     </optgroup>\
//     <optgroup label="Zoom Entrances">\
//       <option value="animate zoomIn">zoomIn</option>\
//       <option value="animate zoomInDown">zoomInDown</option>\
//       <option value="animate zoomInLeft">zoomInLeft</option>\
//       <option value="animate zoomInRight">zoomInRight</option>\
//       <option value="animate zoomInUp">zoomInUp</option>\
//     </optgroup>\
//     <optgroup label="Zoom Exits">\
//       <option value="animate zoomOut">zoomOut</option>\
//       <option value="animate zoomOutDown">zoomOutDown</option>\
//       <option value="animate zoomOutLeft">zoomOutLeft</option>\
//       <option value="animate zoomOutRight">zoomOutRight</option>\
//       <option value="animate zoomOutUp">zoomOutUp</option>\
//     </optgroup>\
//     <optgroup label="Hover effects">\
//       <option value="pd-hover-grow">Grow</a>\
//       <option value="pd-hover-shrink">Shrink</a>\
//       <option value="pd-hover-pulse">Pulse</a>\
//       <option value="pd-hover-pulse-grow">Pulse Grow</a>\
//       <option value="pd-hover-pulse-shrink">Pulse Shrink</a>\
//       <option value="pd-hover-bounce-in">Bounce In</a>\
//       <option value="pd-hover-bounce-out">Bounce Out</a>\
//       <option value="pd-hover-rotate">Rotate</a>\
//       <option value="pd-hover-grow-rotate">Grow Rotate</a>\
//       <option value="pd-hover-float">Float</a>\
//       <option value="pd-hover-sink">Sink</a>\
//       <option value="pd-hover-bob">Bob</a>\
//       <option value="pd-hover-hang">Hang</a>\
//       <option value="pd-hover-skew">Skew</a>\
//       <option value="pd-hover-skew-forward">Skew Forward</a>\
//       <option value="pd-hover-skew-backward">Skew Backward</a>\
//       <option value="pd-hover-buzz">Buzz</a>\
//       <option value="pd-hover-forward">Forward</a>\
//       <option value="pd-hover-backward">Backward</a>\
//     </optgroup>\
//     <optgroup label="Specials">\
//       <option value="animate hinge">hinge</option>\
//       <option value="animate jackInTheBox">jackInTheBox</option>\
//       <option value="animate rollIn">rollIn</option>\
//       <option value="animate rollOut">rollOut</option>\
//     </optgroup>\
//   </select>';








//   animation_options_html += '<p>Before event</p>';
//   animation_options_html += '<select name="state-before">';
//   animation_options_html += '<option value="">Default</option>';
//   animation_options_html += '<option value="show">Show</option>';
//   animation_options_html += '<option value="hide">Hide</option>';
//   animation_options_html += '</select>';


//   animation_options_html += '<p>After event</p>';
//   animation_options_html += '<select name="state-after">';
//   animation_options_html += '<option value="">Do nothing</option>';
//   animation_options_html += '<option value="show">Show</option>';
//   animation_options_html += '<option value="hide">Hide</option>';
//   animation_options_html += '</select>';

//   animation_options_html += '</div>';
//     jQuery('[data-animation-holder]').append( animation_options_html );

// })
