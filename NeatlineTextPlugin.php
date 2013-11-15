<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineTextPlugin extends Omeka_Plugin_AbstractPlugin
{


    const ID = 'Text';


    protected $_hooks = array(
        'neatline_public_static'
    );


    protected $_filters = array(
        'neatline_query_records',
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
            queue_css_file('payloads/text-public');
            queue_js_file('payloads/text-public');
        }
    }


    /**
     * Add `hasSlug` parameter to records API.
     *
     * @param Omeka_Db_Select $select The original select.
     * @param array $args Includes `params`, the API query parameters.
     * @return Omeka_Db_Select The modified select.
     */
    public function filterNeatlineQueryRecords($select, $args)
    {

        // Filter out records without slugs.
        if (isset($args['params']['hasSlug'])) {
            $select->where('slug IS NOT NULL');
        }

        return $select;

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

        if ($args['exhibit']->hasWidget(self::ID)) {

            // Query for narrative models.
            $result = $this->_db->getTable('NeatlineRecord')->queryRecords(
                array('exhibit_id' => $args['exhibit']->id, 'hasSlug' => true)
            );

            // Push collection onto `Neatline.g`.
            $globals = array_merge($globals, array('text' => array(
                'records' => $result['records']
            )));

        }

        return $globals;

    }


}
