
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Narrative', function(
  Narrative, Neatline, Backbone, Marionette, $, _) {


  Narrative.ID = 'NARRATIVE';


  Narrative.addInitializer(function() {

    // Bootstrap text models.
    Narrative.__collection = new Neatline.Shared.Record.Collection(
      Neatline.g.narrative.records
    );

    Narrative.__view = new Narrative.View();

  });


});
