'use strict';

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap() {
    return {
        restrict: 'A',
        scope: { 
            myMapData: '=',
            onRegionClick: '&'
        },
        link: function (scope, element, attrs) {
            var map = new jvm.Map({
                map: 'world_mill_en',
                container: element,
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [
                        {
                            values: scope.myMapData,
                            normalizeFunction: 'polynomial'
                        }
                    ]
                },
                onRegionClick: function(e, code) {
                    scope.onRegionClick({e : e, regionCode : code });
                }
            });

          scope.$watch("myMapData", function (newValue, oldValue) {
              if (newValue !== oldValue) {
                  map.reset();
                  map.series.regions[0].setValues(newValue);
              }
          }, true);

          var destroyMap = function(){
              element.remove();
          };
          scope.$on('$destroy', function() {
              destroyMap();
          });
      } // link function ends
  }  // end of the object that directive expects
}; // end of directive function

angular.module('confusionApp').directive('vectorMap', vectorMap);
