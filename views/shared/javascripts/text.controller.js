
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Text', function(Text) {


  Text.Controller = Neatline.Shared.Controller.extend({


    slug: 'TEXT',

    events: [
      'highlight',
      'unhighlight',
      'select',
      'unselect'
    ],

    requests: [
      'getSpansByModel'
    ],


    /**
     * Create the view.
     */
    init: function() {
      this.view = new Neatline.Text.View({ slug: this.slug });
    },


    /**
     * Highlight tagged elements.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {
      this.view.renderHighlight(args.model);
    },


    /**
     * Unhighlight tagged elements.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      this.view.renderUnhighlight(args.model);
    },


    /**
     * Select tagged elements.
     *
     * @param {Object} args: Event arguments.
     */
    select: function(args) {
      this.view.renderSelect(args.model);
      this.view.scrollTo(args.model);
      this.unhighlight(args);
    },


    /**
     * Unselect tagged elements.
     *
     * @param {Object} args: Event arguments.
     */
    unselect: function(args) {
      this.view.renderUnselect(args.model);
      this.unhighlight(args);
    },


    /**
     * Emit the spans corresponding to a model.
     *
     * @param {Object} model: The model.
     * @return {Object}: The DOM element(s).
     */
    getSpansByModel: function(model) {
      return this.view.getSpansWithSlug(model.get('slug'));
    }


  });


});
