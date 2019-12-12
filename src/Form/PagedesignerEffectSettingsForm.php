<?php
namespace Drupal\pagedesigner_effects\Form;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Yaml\Yaml;


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

    $form['enable_effects'] = array(
      '#type' => 'textarea',
      '#title' => t('Enable events and effects'),
      '#default_value' => \Drupal\Component\Serialization\Yaml::encode($config->get('enable_effects')),
    );

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
    $config->set('enable_effects', Yaml::parse($form_state->getValue('enable_effects')));
    $config->save();
  }
}
