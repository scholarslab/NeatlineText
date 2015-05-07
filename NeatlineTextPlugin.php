<?php

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineTextPlugin extends Omeka_Plugin_AbstractPlugin
{


    const ID = 'Text';


    protected $_hooks = array(
        'neatline_public_static',
        'neatline_public_templates'
    );


    protected $_filters = array(
        'neatline_exhibit_widgets',
        'neatline_globals'
    );


    /**
     * Queue public payloads.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlinePublicStatic($args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            queue_css_file('dist/text-public');
            queue_js_file('dist/text-public');
        }
    }

    /**
     * If Neatline Text is enabled and Neatline is in fullscreen, gets the narrative markup.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlinePublicTemplates($args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            $action = Zend_Controller_Front::getInstance()->getRequest()->getActionName();
            if ($action == "fullscreen" ) {
                echo nl_getNarrativeMarkup();
            }
        }
    }


    /**
     * Register the exhibit widget.
     *
     * @param array $widgets Widgets, <NAME> => <ID>.
     * @return array The modified array.
     */
    public function filterNeatlineExhibitWidgets($widgets)
    {
        return array_merge($widgets, array(self::ID => self::ID));
    }


    /**
     * Bootstrap text-active records on `Neatline.g`.
     *
     * @param array $globals The array of global properties.
     * @param array $args Contains: `exhibit` (NeatlineExhibit).
     * @return array The modified array.
     */
    public function filterNeatlineGlobals($globals, $args)
    {

        $exhibit = $args['exhibit'];

        // Bootstrap records if the widget is activated for the exhibit and
        // spatial querying is enabled (if not, we can just use the colleciton
        // loaded by the map, which will include all records).

        if ($exhibit->hasWidget(self::ID) && $exhibit->spatial_querying) {

            // Query for records with slugs.
            $result = $this->_db->getTable('NeatlineRecord')->queryRecords(
                array('exhibit_id' => $exhibit->id, 'hasSlug' => true)
            );

            // Push collection onto `Neatline.g`.
            $globals = array_merge($globals, array('text' => array(
                'records' => $result['records']
            )));

        }

        return $globals;

    }


}
