<?php

namespace Drupal\pagedesigner_effects\Plugin\pagedesigner\Handler;

use Drupal\pagedesigner\Entity\Element;
use Drupal\pagedesigner\Plugin\CompoundHandlerBase;
use Symfony\Component\Yaml\Yaml as YamlParser;
use Drupal\Component\Serialization\Yaml as YamlSerializer;

/**
 * Add effects functionality to "row" and "component" patterns.
 *
 * @PagedesignerHandler(
 *   id = "effects",
 *   name = @Translation("Effects handler"),
 *   types = {
 *      "row",
 *      "component"
 *   },
 *   weight = 50
 * )
 */
class Effects extends CompoundHandlerBase {

  /**
   * {@inheritDoc}
   */
  public function collectAttachments(array &$attachments) {
    if (\Drupal::currentUser()->hasPermission('pd_effect_use')) {
      $config = \Drupal::config('pagedesigner_effects.settings');
      $attachments['drupalSettings']['pagedesigner_effects']['effects'] = YamlParser::parse(YamlSerializer::decode($config->get('enable_effects')));
      $attachments['library'][] = 'pagedesigner_effects/pagedesigner';
    }
  }

  /**
   * {@inheritDoc}
   */
  public function serialize(Element $entity, array &$result = []) {
    if (!$entity->field_effects->isEmpty()) {
      $result['effects'] = json_decode($entity->field_effects->value, TRUE);
    }
    else {
      $result['effects'] = [];
    }
  }

  /**
   * {@inheritDoc}
   */
  public function get(Element $entity, string &$result = '') {

  }

  /**
   * {@inheritDoc}
   */
  public function patch(Element $entity, array $data) {
    if ($entity->hasField('field_effects')) {
      if (!empty($data['effects'])) {
        $entity->field_effects->value = json_encode($data['effects']);
      }
      else {
        $entity->field_effects->value = '';
      }
      $entity->save();
    }
  }

  /**
   * {@inheritDoc}
   */
  public function renderForPublic(Element $entity, array &$build = []) {
    $this->addEffects($entity, $build);
  }

  /**
   * {@inheritDoc}
   */
  public function render(Element $entity, array &$build = []) {
    $this->addEffects($entity, $build);
  }

  /**
   * Add the user generated effects of the entity to drupalSettings.
   */
  protected function addEffects(Element $entity, array &$build = []) {
    if (!$entity->hasField('field_effects') || $entity->field_effects->isEmpty()) {
      return;
    }
    if (empty($build['#attached'])) {
      $build['#attached'] = [];
    }
    if (empty($build['#attached']['drupalSettings'])) {
      $build['#attached']['drupalSettings'] = [];
    }
    if (empty($build['#attached']['drupalSettings']['pagedesigner'])) {
      $build['#attached']['drupalSettings']['pagedesigner'] = [];
    }
    if (empty($build['#attached']['drupalSettings']['pagedesigner']['effects'])) {
      $build['#attached']['drupalSettings']['pagedesigner']['effects'] = [];
    }
    $build['#attached']['drupalSettings']['pagedesigner']['effects']['#pd-cp-' . $entity->id()] = json_decode($entity->field_effects->value);

  }

}
