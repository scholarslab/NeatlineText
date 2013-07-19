<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_JSON extends NeatlineText_Case_Fixture
{


    public function testRecords()
    {

        $record1 = $this->_record($this->exhibit);
        $record2 = $this->_record($this->exhibit);

        $record1->slug = 'slug-1';
        $record2->slug = 'slug-2';

        $record1->save();
        $record2->save();

        $this->_writeFixtureFromRoute('neatline/records',
            'records.json'
        );

    }


}
