
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Narrative', function(
  Narrative, Neatline, Backbone, Marionette, $, _) {


  Narrative.View = Backbone.View.extend({


    el: '#neatline-narrative',

    events: {
      'mouseenter [data-neatline-slug]':  'onHighlight',
      'mouseleave [data-neatline-slug]':  'onUnhighlight',
      'click [data-neatline-slug]':       'onSelect'
    },


    /**
     * Publish `highlight` when the cursor enters a span.
     *
     * @param {Object} e: The DOM event.
     */
    onHighlight: function(e) {
      var model = this.getMapRecordFromEvent(e)
      if (model) Neatline.vent.trigger('highlight', {
        source: Narrative.ID,
        model:  model
      });
    },


    /**
     * Publish `unhighlight` when the cursor leaves a span.
     *
     * @param {Object} e: The DOM event.
     */
    onUnhighlight: function(e) {
      var model = this.getMapRecordFromEvent(e)
      if (model) Neatline.vent.trigger('unhighlight', {
        source: Narrative.ID,
        model:  model
      });
    },


    /**
     * Publish `select` when a span is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    onSelect: function(e) {
      console.log('select', e);
    },


    /**
     * Get the slug associated with a DOM event.
     *
     * @param {Object} e: The DOM event.
     * @return {String}: The target element's slug.
     */
    getSlugFromEvent: function(e) {
      return $(e.currentTarget).attr('data-neatline-slug');
    },


    /**
     * Try to get a record from the map collection with a slug that
     * matches the value of the `data-neatline-slug` attribute on the
     * element associated with the passed event.
     *
     * @param {Object} e: The DOM event.
     * @return {String}: The target element's slug.
     */
    getMapRecordFromEvent: function(e) {
      return Neatline.request('MAP:getRecords').findWhere({
        slug: this.getSlugFromEvent(e)
      });
    }


  });


});
