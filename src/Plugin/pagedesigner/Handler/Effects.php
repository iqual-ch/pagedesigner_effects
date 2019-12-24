<?php
namespace Drupal\pagedesigner_effects\Plugin\pagedesigner\Handler;

use Drupal\pagedesigner\Entity\Element;
use Drupal\pagedesigner\Plugin\CompoundHandlerBase;

/**
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
class Effects extends CompoundHandlerBase
{

    /**
     * {@inheritDoc}
     */
    public function collectAttachments(&$attachments)
    {
        if (\Drupal::currentUser()->hasPermission('pd_effect_use')) {
            $config = \Drupal::config('pagedesigner_effects.settings');
            $attachments['drupalSettings']['pagedesigner_effects']['effects'] = $config->get('enable_effects');
            $attachments['library'][] = 'pagedesigner_effects/pagedesigner';
        }
    }

    /**
     * {@inheritDoc}
     */
    public function serialize(Element $entity, &$result = [])
    {
        $result['effects'] = json_decode($entity->field_effects->value, true);
    }

    /**
     * {@inheritDoc}
     */
    public function get(Element $entity, &$result = '')
    {

    }

    /**
     * {@inheritDoc}
     */
    public function patch(Element $entity, $data)
    {
        if (!empty($data['effects'])) {
            $entity->field_effects->value = json_encode($data['effects']);
            $entity->save();
        }
    }

    /**
     * {@inheritDoc}
     */
    public function render(Element $entity, &$build = [])
    {
        if ($entity->field_effects->isEmpty()) {
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
