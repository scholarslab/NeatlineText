
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
     * Initialize state trackers.
     */
    init: function(model) {
      this.model = null;
    },


    /**
     * Add `highlighted` class to tagged spans.
     *
     * @param {Object} model: The record model.
     */
    highlight: function(model) {
      this.getSpansWithSlug(model.get('slug')).addClass('highlighted');
    },


    /**
     * Remove `highlighted` class from tagged spans.
     *
     * @param {Object} model: The record model.
     */
    unhighlight: function(model) {
      this.getSpansWithSlug(model.get('slug')).removeClass('highlighted');
    },


    /**
     * Add `selected` class to tagged spans.
     *
     * @param {Object} model: The record model.
     */
    select: function(model) {
      if (this.model) this.unselect(this.model);
      this.getSpansWithSlug(model.get('slug')).addClass('selected');
      this.model = model;
    },


    /**
     * Remove `selected` class from tagged spans.
     *
     * @param {Object} model: The record model.
     */
    unselect: function(model) {
      this.getSpansWithSlug(model.get('slug')).removeClass('selected');
      this.model = null;
    },


    /**
     * Publish `highlight` when the cursor enters a span.
     *
     * @param {Object} e: The DOM event.
     */
    onHighlight: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('highlight', model);
    },


    /**
     * Publish `unhighlight` when the cursor leaves a span.
     *
     * @param {Object} e: The DOM event.
     */
    onUnhighlight: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('unhighlight', model);
    },


    /**
     * Publish `select` when a span is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    onSelect: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('select', model);
    },


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
