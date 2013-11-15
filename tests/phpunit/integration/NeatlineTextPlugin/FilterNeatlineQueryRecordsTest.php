<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     neatline
 * @subpackage  texts
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class NeatlineTextPluginTest_FilterNeatlineQueryRecords
    extends NeatlineText_Case_Default
{


    /**
     * `filterNeatlineQueryRecords` should implement a `hasSlug` parameter on
     * the records API that matches all records with non-null slugs.
     */
    public function testFilterNeatlineQueryRecords()
    {

        $exhibit = $this->_exhibit();
        $record1 = new NeatlineRecord($exhibit);
        $record2 = new NeatlineRecord($exhibit);
        $record1->slug = 'slug';
        $record2->slug = null;

        $record1->save();
        $record2->save();

        // Query for `hasSlug`.
        $result = $this->_records->queryRecords(array(
            'exhibit_id' => $exhibit->id,'hasSlug' => true
        ));

        $this->assertEquals($result['records'][0]['id'], $record1->id);
        $this->assertCount(1, $result['records']);

    }


}

