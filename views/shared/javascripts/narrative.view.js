
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
      'mouseenter [data-neatline-slug]': 'onHighlight',
      'mouseleave [data-neatline-slug]': 'onUnhighlight',
      'click [data-neatline-slug]': 'onSelect'
    },


    /**
     * Trigger `highlight` on span mouseenter.
     *
     * @param {Object} e: The DOM event.
     */
    onHighlight: function(e) {
      console.log('highlight', e);
    },


    /**
     * Trigger `unhighlight` on span mouseleave.
     *
     * @param {Object} e: The DOM event.
     */
    onUnhighlight: function(e) {
      console.log('unhighlight', e);
    },


    /**
     * Trigger `select` on span click.
     *
     * @param {Object} e: The DOM event.
     */
    onSelect: function(e) {
      console.log('select', e);
    }


  });


});
