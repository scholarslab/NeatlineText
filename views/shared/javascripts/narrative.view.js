
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
      'mouseenter [data-neatline-slug]':  'publishHighlight',
      'mouseleave [data-neatline-slug]':  'publishUnhighlight',
      'click [data-neatline-slug]':       'publishSelect',
      'click':                            'publishUnselect'
    },


    /**
     * Initialize state trackers.
     */
    initialize: function(model) {
      this.model = null;
    },


    // PUBLISHERS
    // --------------------------------------------------------------------


    /**
     * Publish `highlight` when the cursor enters a span.
     *
     * @param {Object} e: The DOM event.
     */
    publishHighlight: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('highlight', model);
    },


    /**
     * Publish `unhighlight` when the cursor leaves a span.
     *
     * @param {Object} e: The DOM event.
     */
    publishUnhighlight: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('unhighlight', model);
    },


    /**
     * Publish `select` when a span is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    publishSelect: function(e) {

      // Unselect the current model.
      if (this.model) this.publish('unselect', this.model);

      // Publish the new selection.
      var model = this.getModelFromEvent(e);
      if (model) this.publish('select', model);

      e.stopPropagation();

    },


    /**
     * Unselect the current model on click-off.
     *
     * @param {Object} e: The DOM event.
     */
    publishUnselect: function(e) {
      if (this.model) this.publish('unselect', this.model);
    },


    // RENDERERS
    // --------------------------------------------------------------------


    /**
     * Add `highlighted` class to tagged spans.
     *
     * @param {Object} model: The record model.
     */
    renderHighlight: function(model) {
      this.getSpansWithSlug(model.get('slug')).addClass('highlighted');
    },


    /**
     * Remove `highlighted` class from tagged spans.
     *
     * @param {Object} model: The record model.
     */
    renderUnhighlight: function(model) {
      this.getSpansWithSlug(model.get('slug')).removeClass('highlighted');
    },


    /**
     * Add `selected` class to tagged spans.
     *
     * @param {Object} model: The record model.
     */
    renderSelect: function(model) {

      // Unselect the current model.
      if (this.model) this.publish('unselect', this.model);

      // Select the new model.
      this.getSpansWithSlug(model.get('slug')).addClass('selected');
      this.model = model;

    },


    /**
     * Remove `selected` class from tagged spans.
     *
     * @param {Object} model: The record model.
     */
    renderUnselect: function(model) {
      this.getSpansWithSlug(model.get('slug')).removeClass('selected');
      this.model = null;
    },


    // HELPERS
    // --------------------------------------------------------------------


    /**
     * Query for elements tagged with a slug.
     *
     * @param {String} slug: A record slug.
     * @return {Object}: The DOM selection.
     */
    getSpansWithSlug: function(slug) {
      return this.$('[data-neatline-slug="'+slug+'"]');
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
     * Try to find a model in the collection that corresponds to a DOM
     * event triggered from a tagged element.
     *
     * @param {Object} e: The DOM event.
     * @return {String}: The target element's slug.
     */
    getModelFromEvent: function(e) {
      return Narrative.__collection.findWhere({
        slug: this.getSlugFromEvent(e)
      });
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
    }


  });


});
