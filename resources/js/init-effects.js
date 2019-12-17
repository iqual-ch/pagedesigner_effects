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

    $('[data-effects-container]').html('');

    self = this;
    if(this.component.attributes.effects){
      this.component.attributes.effects.forEach(function(effect){
        self.formEditEffect(effect);
      });
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
    this.component.set('changed', true);
  }

  formEditEffect(effect){
    var component = this.component;
    self = this;

    var effect_form = $('<div class="edit-effect"></div>');
    effect_form.append('<p><strong>' + effect.event + '</strong></p>');

    var btn_remove_effect = $('<a class="btn-remove-effect"><i class="fas fa-times"></i></a>');
    effect_form.append(btn_remove_effect);


    btn_remove_effect.on('click', function(){
      component.attributes.effects.splice( component.attributes.effects.indexOf(effect), 1 );
      effect_form.remove();
      component.set('changed', true);
    });

    effect_form.append('<p><a>' + effect.event + '</strong></p>');
    Object.keys(this.events[effect.event].fields).forEach( field =>{
      effect_form.append(self.editEffectField(effect, field));
    });

    $('[data-effects-container]').append(effect_form);
  }



  editEffectField(effect, field){
    var component = this.component;

    var field_holder = $('<label></label>');
    field_holder.append('<p>' + this.events[effect.event].fields[field].label + '</p>' ) ;

    switch(this.events[effect.event].fields[field].type){
      case 'text':
        var input_element = $('<input type="text" />');
        if(effect[field]){
          input_element.val(effect[field]);
        }
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
              var option_element = $('<option value"' + option + '">' + self.events[effect.event].fields[field].options[optgoup][option] + '</option>');
              if( effect[field] &&  effect[field] == option  ){
                option_element.attr('selected', 'selected')
              }
              group.append(option_element)
            });
            input_element.append(group);

          }
        });

        break;
    }

    input_element.on('change', function(){
      effect[field] = $(this).val();
      component.set('changed', true);
    });

    field_holder.append(input_element);

    return field_holder;


  }

}







(function ($, Drupal) {
  Drupal.behaviors.pagedesigner_init_component_effects = {
    attach: function (context, settings) {
      $(document).on('pagedesigner-after-init', function (e, editor, options) {
        editor.on('run:edit-component', (component, sender) => {
          var pagedeisnger_effect_handler = new PagedesignerEffectHandler(editor, jQuery, drupalSettings.pagedesigner_effects);
          pagedeisnger_effect_handler.init(editor.getSelected());

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
                component_data.effects = [...this.attributes.effects ];
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
                component_data.effects = [...this.attributes.effects ];
              }

              return component_data;

            },

            handleLoadResponse(response) {
              this.setAttributes(Object.assign({}, this.getAttributes(), response['fields']));
              if (response['classes']) {
                this.addClass(response['classes']);
              }

              if( response['effects'] ){
                this.attributes.effects = response['effects'];
              }

              // debug / testing
              if( !this.attributes.effects ){
                this.attributes.effects = [{
                  'event': 'mouseenter',
                  'effect': 'flash'
                }];
              }
              this.set('previousVersion', Object.assign({},this.serialize()));
              this.set('changed', false);
            },

            handleSaveResponse() {
              // do stuff with response from saving
              this.set('previousVersion', Object.assign({},this.serialize()));

            },

            restore() {

              // needs some love
              var previousData = this.get('previousVersion');
              this.setAttributes(Object.assign({}, this.getAttributes(), previousData['fields']));
              this.removeClass(this.getClasses());

              if( previousData['effects'] ){
                this.attributes.effects = previousData['effects'];
              }

              if (previousData['classes']) {
                this.addClass(previousData['classes']);
              }

              for (var media in previousData['styles']) {
                if (media == 'large') {
                  editor.CssComposer.setIdRule('pd-cp-' + this.get('entityId'), editor.Parser.parseCss('*{' + previousData['styles'][media] + '}')[0].style)
                }
                if (media == 'medium') {
                  editor.CssComposer.setIdRule('pd-cp-' + this.get('entityId'), editor.Parser.parseCss('*{' + previousData['styles'][media] + '}')[0].style, { mediaText: "(max-width: 992px)" })
                }
                if (media == 'small') {
                  editor.CssComposer.setIdRule('pd-cp-' + this.get('entityId'), editor.Parser.parseCss('*{' + previousData['styles'][media] + '}')[0].style, { mediaText: "(max-width: 768px)" })
                }
              }
              this.set('changed', false);
            },

          }
        });
      });
    }
  };
})(jQuery, Drupal);
