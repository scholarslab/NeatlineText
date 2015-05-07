
/**
 * @package     neatline
 * @subpackage  texts
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var TEXT = (function(TEXT) {


  /**
   * Find an element inside the narrative container.
   *
   * @param {String} selector: A CSS selector.
   */
  TEXT.find = function(selector) {
    return Neatline.Text.__controller.view.$(selector);
  };


  return TEXT;


})(TEXT || {});
