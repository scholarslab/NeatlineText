
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  texts
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var TEXT = (function(TEXT) {


  /**
   * Get a map collection model by slug.
   *
   * @param {String} slug: A record slug.
   */
  TEXT.getMapRecordBySlug = function(slug) {
    return Neatline.Map.__controller.collection.findWhere({ slug: slug });
  };


  return TEXT;


})(TEXT || {});
