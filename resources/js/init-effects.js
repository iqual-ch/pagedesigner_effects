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
    this.component = {};

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

  init(component){
    this.component = component;
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
    });
    var btn = this.jQuery(markup);

    btn.on('change', function () {
      self.addEffect($(this).val());
      $(this).find('option').first().attr("selected", true);
      $(this).find('option').first().removeAttr("selected");
    });

    return btn;
  }

  addEffect(event){
    if( !this.component.attributes.effects ){
      this.component.attributes.effects = [];
    }
    var effect = {
      'event' : event
    };
    this.formEditEffect(effect);
    this.component.attributes.effects.push(effect);
  }

  formEditEffect(effect){
    var effect_form = $('<div class="edit-effect"></div>');
    effect_form.append('<p><strong>' + effect.event + '</strong></p>');

    var btn_remove_effect = $('<a class="btn-remove-effect"><i class="fas fa-times"></i></a>');
    effect_form.append(btn_remove_effect);

    self = this;
    btn_remove_effect.on('click', function(){
//      delete effect;
      self.component.attributes.effects.splice( self.component.attributes.effects.indexOf(effect), 1 );

      effect_form.remove();
    });


    effect_form.append('<p><a>' + effect.event + '</strong></p>');
    self = this;
    Object.keys(this.events[effect.event].fields).forEach( field =>{
      effect_form.append(self.editEffectField(effect, field));
    });

    $('[data-effects-container]').append(effect_form);
  }



  editEffectField(effect, field){
    var field_holder = $('<label></label>');
    field_holder.append('<p>' + this.events[effect.event].fields[field].label + '</p>' ) ;

    switch(this.events[effect.event].fields[field].type){
      case 'text':
        var input_element = $('<input type="text" />');
        break;

      case 'select':
        var input_element = $('<select></select>');
        self = this;
        Object.keys(self.events[effect.event].fields[field].options).forEach( optgoup =>{

          if( typeof self.events[effect.event].fields[field].options[optgoup] == 'string' ){
            input_element.append('<option value"' + optgoup + '">' + self.events[effect.event].fields[field].options[optgoup] + '</option>');
          }else{
            var group = $('<optgroup label="' + optgoup + '"></optgroup> ');

            Object.keys(self.events[effect.event].fields[field].options[optgoup]).forEach( option =>{
              group.append('<option value"' + option + '">' + self.events[effect.event].fields[field].options[optgoup][option] + '</option>')
            });
            input_element.append(group);

          }
        });

        break;
    }

    input_element.on('change', function(){
      effect[field] = $(this).val()
    });

    field_holder.append(input_element);

    return field_holder;


  }

}







(function ($, Drupal) {
  Drupal.behaviors.pagedesigner_init_component_effects = {
    attach: function (context, settings) {
      $(document).on('pagedesigner-after-init', function (e, editor, options) {
        editor.on('component:selected', (component, sender) => {
          var pagedeisnger_effect_handler = new PagedesignerEffectHandler(editor, jQuery, drupalSettings.pagedesigner_effects);
          pagedeisnger_effect_handler.init(component);

        });
      });

      $(document).on('pagedesigner-init-components', function (e, editor, options) {




        editor.DomComponents.addType('component', {
          extend: 'component',
          model: {
            serialize() {
              var styles = {};
              if (this.get('entityId')) {
                var selector = editor.SelectorManager.get('#pd-cp-' + this.get('entityId'));
                if (selector) {
                  editor.DeviceManager.getAll().forEach(function (device) {
                    var style = false;
                    if (device.get('widthMedia').length > 0) {
                      style = editor.CssComposer.get(selector, null, '(max-width: ' + device.get('widthMedia') + ')')
                    } else {
                      style = editor.CssComposer.get(selector);
                    }
                    if (style) {
                      styles[device.get('key')] = style.styleToString();
                    }
                  });
                }
              }

              var component_data = {
                fields: this.attributes.attributes,
                styles: styles,
                classes: this.getClasses()
              };

              if ( this.attributes.effects ){
                component_data.effects = this.attributes.effects;
              }

              return component_data;
            }
          }
        })



        editor.DomComponents.addType('row', {
          extend: 'row',
          model: {
            serialize() {
              var styles = {};
              if (this.get('entityId')) {
                var selector = editor.SelectorManager.get('#pd-cp-' + this.get('entityId'));
                if (selector) {
                  editor.DeviceManager.getAll().forEach(function (device) {
                    var style = false;
                    if (device.get('widthMedia').length > 0) {
                      style = editor.CssComposer.get(selector, null, '(max-width: ' + device.get('widthMedia') + ')')
                    } else {
                      style = editor.CssComposer.get(selector);
                    }
                    if (style) {
                      styles[device.get('key')] = style.styleToString();
                    }
                  });
                }
              }

              var component_data = {
                fields: this.attributes.attributes,
                styles: styles,
                classes: this.getClasses()
              };

              if ( this.attributes.effects ){
                component_data.effects = this.attributes.effects;
              }

              return component_data;

            }
          }
        });
      });
    }
  };
})(jQuery, Drupal);
