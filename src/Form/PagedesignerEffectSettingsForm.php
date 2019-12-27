<?php

namespace Drupal\pagedesigner_effects\Form;

use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Add the pagedesigner effects settings form.
 */
class PagedesignerEffectSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'pagedesigner_effects.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'pagedesigner_effects_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    parent::buildForm($form, $form_state);
    $config = $this->config('pagedesigner_effects.settings');

    $form['enable_effects'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Enable events and effects'),
      '#default_value' => Yaml::decode($config->get('enable_effects')),
    ];

    return parent::buildForm($form, $form_state);

  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $config = $this->config('pagedesigner_effects.settings');
    $config->set('enable_effects', Yaml::encode($form_state->getValue('enable_effects')));
    $config->save();
  }

}
