
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Text', function(
  Text, Neatline, Backbone, Marionette, $, _) {


  Text.ID = 'TEXT';


  Text.addInitializer(function() {

    // Bootstrap text models.
    Text.__collection = new Neatline.Shared.Record.Collection(
      Neatline.g.text.records
    );

    Text.__view = new Text.View();

  });


});
