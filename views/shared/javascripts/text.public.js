
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Text', function(
  Text, Neatline, Backbone, Marionette, $, _) {


  /**
   * Highlight tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var highlight = function(args) {
    Text.__view.renderHighlight(args.model);
  };
  Neatline.commands.setHandler(Text.ID+':highlight', highlight);
  Neatline.vent.on('highlight', highlight);


  /**
   * Unhighlight tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var unhighlight = function(args) {
    Text.__view.renderUnhighlight(args.model);
  };
  Neatline.commands.setHandler(Text.ID+':unhighlight', unhighlight);
  Neatline.vent.on('unhighlight', unhighlight);


  /**
   * Select tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var select = function(args) {
    Text.__view.renderSelect(args.model);
    Text.__view.scrollTo(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Text.ID+':select', select);
  Neatline.vent.on('select', select);


  /**
   * Unselect tagged elements.
   *
   * @param {Object} args: Event arguments.
   */
  var unselect = function(args) {
    Text.__view.renderUnselect(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Text.ID+':unselect', unselect);
  Neatline.vent.on('unselect', unselect);


});
