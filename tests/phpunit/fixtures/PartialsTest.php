<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_Partials extends NeatlineNarrative_Case_Default
{


    protected $_isAdminTest = false;


    /**
     * Inject the real `layers.json`, mock exhibit.
     */
    public function setUp()
    {

        parent::setUp();

        // Register script path.
        get_view()->addScriptPath(NL_DIR . '/views/shared');

        // Mock exhibit.
        $exhibit = $this->__exhibit();
        $exhibit->base_layer = "OpenStreetMap";

        // Mock narrative.
        $exhibit->narrative = "
          <span data-neatline-slug='slug-1'>word1</span>
          <span data-neatline-slug='slug-1'>word2</span>
          <span data-neatline-slug='slug-2'>word3</span>
        ";

        $exhibit->save();

        // Set exhibit on view.
        get_view()->neatline_exhibit = $exhibit;

    }


    /**
     * `neatline-partial.html`
     */
    public function testNeatlinePartial()
    {
        $this->writeFixture(
            nl_getExhibitMarkup() . nl_getNarrativeMarkup(),
            'neatline-partial.html'
        );
    }


}
