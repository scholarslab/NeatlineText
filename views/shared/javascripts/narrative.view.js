
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
      if (model) this.publish('highlight', model);
    },


    /**
     * Publish `unhighlight` when the cursor leaves a span.
     *
     * @param {Object} e: The DOM event.
     */
    onUnhighlight: function(e) {
      var model = this.getMapRecordFromEvent(e)
      if (model) this.publish('unhighlight', model);
    },


    /**
     * Publish `select` when a span is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    onSelect: function(e) {

      // Try to publish existing model.
      var model = this.getMapRecordFromEvent(e)
      if (model) this.publish('select', model);

      else {

        var params = { slug: this.getSlugFromEvent(e) };

        // Otherwise, load from the server.
        Narrative.__collection.update(params, _.bind(function(records) {
          this.publish('select', records.first());
        }, this));

      }

    },


    /**
     * Publish an event with a model.
     *
     * @param {String} event: An event name.
     * @param {Object} model: A record model.
     */
    publish: function(event, model) {
      Neatline.vent.trigger(event, {
        source: Narrative.ID, model: model
      });
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
