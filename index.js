(function() {
    'use strict';

    angular.module('carouselApp', [
            'ngAnimate'
        ])
        .controller('CarouselController', CarouselController);

    CarouselController.$inject = ['$scope'];

    function CarouselController($scope) {
        $scope.images = [
            { src: 'img/img1.png', title: 'Pic 1' },
            { src: 'img/img2.jpg', title: 'Pic 2' },
            { src: 'img/img3.jpg', title: 'Pic 3' },
            { src: 'img/img4.png', title: 'Pic 4' },
            { src: 'img/img5.png', title: 'Pic 5' }
        ];
    }
})();
