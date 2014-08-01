
/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Text', function(Text) {


  Text.addInitializer(function() {

    // Spatial querying ENABLED:
    if (Neatline.g.neatline.exhibit.spatial_querying) {

      // Use the bootstrapped records.
      var records = new Neatline.Shared.Record.Collection(
        Neatline.g.text.records
      );

      // Start with the application.
      Text.__controller = new Text.Controller(records);

    }

    // Spatial querying DISABLED:
    else {

      // Wait for the map's collection.
      Neatline.vent.once('MAP:ingest', function(records) {
        Text.__controller = new Text.Controller(records);
      });

    }

  });


});
