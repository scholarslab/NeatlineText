
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Narrative', function(
  Narrative, Neatline, Backbone, Marionette, $, _) {


  /**
   * Highlight tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var highlight = function(args) {
    Narrative.__view.renderHighlight(args.model);
  };
  Neatline.commands.setHandler(Narrative.ID+':highlight', highlight);
  Neatline.vent.on('highlight', highlight);


  /**
   * Unhighlight tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var unhighlight = function(args) {
    Narrative.__view.renderUnhighlight(args.model);
  };
  Neatline.commands.setHandler(Narrative.ID+':unhighlight', unhighlight);
  Neatline.vent.on('unhighlight', unhighlight);


  /**
   * Select tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var select = function(args) {
    Narrative.__view.renderSelect(args.model);
    Narrative.__view.scrollTo(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Narrative.ID+':select', select);
  Neatline.vent.on('select', select);


  /**
   * Unselect tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var unselect = function(args) {
    Narrative.__view.renderUnselect(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Narrative.ID+':unselect', unselect);
  Neatline.vent.on('unselect', unselect);


});
