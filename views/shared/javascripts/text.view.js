
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Text', function(Text) {


  Text.View = Backbone.View.extend({


    el: '#neatline-narrative',

    events: {
      'mouseenter [data-neatline-slug]':  'publishHighlight',
      'mouseleave [data-neatline-slug]':  'publishUnhighlight',
      'click [data-neatline-slug]':       'publishSelect',
      'click':                            'publishUnselect'
    },

    options: {
      duration: 200,
      padding: 200
    },


    /**
     * Initialize state, bootstrap the collection.
     *
     * @param {Object} options
     */
    initialize: function(options) {

      this.slug = options.slug;
      this.model = null;

      // Mount the bootstrapped collection of models.
      this.records = new Neatline.Shared.Record.Collection(
        Neatline.g.text.records
      );

    },


    // PUBLISHERS
    // ------------------------------------------------------------------------


    /**
     * Publish `highlight` when the cursor enters a span.
     *
     * @param {Object} e: The DOM event.
     */
    publishHighlight: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('highlight', model, e);
    },


    /**
     * Publish `unhighlight` when the cursor leaves a span.
     *
     * @param {Object} e: The DOM event.
     */
    publishUnhighlight: function(e) {
      var model = this.getModelFromEvent(e);
      if (model) this.publish('unhighlight', model, e);
    },


    /**
     * Publish `select` when a span is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    publishSelect: function(e) {

      // Publish the new model.
      var model = this.getModelFromEvent(e);
      if (model) this.publish('select', model, e);

      // Block the event from bubbling up to the view container, where it
      // would trigged `unselect`, effectively negating the selection.
      e.stopPropagation();

    },


    /**
     * Unselect the currently-selected model.
     *
     * @param {Object} e: The DOM event.
     */
    publishUnselect: function(e) {
      if (this.model) this.publish('unselect', this.model, e);
    },


    // RENDERERS
    // ------------------------------------------------------------------------


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

      // Unselect currently-selected model.
      this.publishUnselect();

      // Render selection, store model.
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


    /**
     * Scroll to the spans for a model.
     *
     * @param {Object} model: The record model.
     */
    scrollTo: function(model) {

      // Get the first span tagged with the slug.
      var span = this.getSpansWithSlug(model.get('slug'))[0];
      if (!span) return;

      // Scroll to span:
      this.$el.animate({
        scrollTop: span.offsetTop - this.options.padding
      }, {
        duration: this.options.duration
      });

    },


    // HELPERS
    // ------------------------------------------------------------------------


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
     * Try to find a model in the collection that corresponds to a DOM event
     * triggered from a tagged element.
     *
     * @param {Object} e: The DOM event.
     * @return {String}: The target element's slug.
     */
    getModelFromEvent: function(e) {
      return this.records.findWhere({ slug: this.getSlugFromEvent(e) });
    },


    /**
     * Publish an event with a model.
     *
     * @param {String} event: The Neatline event name.
     * @param {Object} model: The record model.
     * @param {Object} domEvent: The triggering DOM event.
     */
    publish: function(event, model, domEvent) {
      Neatline.vent.trigger(event, {
        model: model, event: domEvent, source: this.slug
      });
    }


  });


});
