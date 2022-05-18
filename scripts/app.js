
var app = angular.module("myApp",['angularUtils.directives.dirPagination','ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/partials/tabHocSinh.html'
        })

        .when('/student', {
            templateUrl: '/partials/tabHocSinh.html'
        })

        .when('/addStudent', {
            templateUrl: '/partials/tabThemSinhVien.html'
        })

        .when('/editStudent', {
            templateUrl: '/partials/tabSuaHocSinh.html'
        })

        .when('/class', {
            templateUrl: '/partials/tabLop.html'
        })

        .when('/addClass', {
            templateUrl: '/partials/tabThemLop.html'
        })

        .when('/editClass', {
            templateUrl: '/partials/tabSuaLop.html'
        })

});

		app.controller('nested_repeat',  function($scope, $location){
			
			var khoi1 = [
				{name: "lop" },
				{name: "lop11" },
				{name: "lop11a" },
				{name: "lop11b" },
				{name: "lop12" },
				{name: "lop12a" },
				{name: "lop12b" }
			];
			$scope.khoi1 = khoi1;
			var khoi = [
				{name:"lop10"},
				{name:"lop11"},
				{name:"lop12"}
			];
			$scope.khoi = khoi;
			
			var SinhVien = [
				{id: 1, hoten: "khoa", tuoi:new Date(1992,02,02),lop:"lop11a"},
				{id: 2, hoten: "manh", tuoi:new Date(2001,02,02),lop:"lop11b"},
				{id: 3, hoten: "huy", tuoi:new Date(1999,02,02),lop:"lop12a"},
				{id: 4, hoten: "nam", tuoi:new Date(1994,02,02),lop:"lop12b"}
				
			];

			$scope.SinhVienDefault = angular.copy($scope.SinhVien);

			//paging hoc sinh

			$scope.chuyenTabThemHS = function(){
				$location.path('/addStudent');
			}
			$scope.objecths;
			$scope.chuyenTabSuaHS = function(hs){
				$scope.objecths = hs; 
				$location.path('/editStudent');


			}
			$scope.chuyenTabThemLop = function(){
				$location.path('/addClass');
			}
			$scope.chuyenTabSuaLop = function(){
				$location.path('/editClass');
			}

			$scope.SinhVien = [],
			$scope.currentPname = 1,
			$scope.numPerPname = 10,
			$scope.maxSize = 5;
			for(var i = 4; i < 100; i++){
					var Student = {id: i + 1, hoten: "khoa" , tuoi:new Date(1992,02,02),lop:"lop11a"};
					SinhVien.push(Student);
			}
			$scope.$watch('currentPtimtuoi + numPerPtimtuoi', function() {
					var begin = (($scope.currentPname - 1) * $scope.numPerPname),
					end = begin + $scope.numPerPname;
			$scope.filteredTodos = $scope.SinhVien.slice(begin, end);
			});
			
			$scope.sort = function(keyname){
                            $scope.sortKey = keyname;   
                            $scope.reverse = !$scope.reverse;
                    }
            //paging lop
            

			// $scope.khoi1 = [],
			// $scope.currentPname = 1,
			// $scope.numPerPname = 10,
			// $scope.maxSize = 5;
			// for(var i = 0; i < 100; i++){
			// 		var clas = {name: "lop11"};
			// 		khoi1.push(clas);
			// }
			// $scope.$watch('currentPtimtuoi + numPerPtimtuoi', function() {
			// 		var begin = (($scope.currentPname - 1) * $scope.numPerPname),
			// 		end = begin + $scope.numPerPname;
			// $scope.filter = $scope.khoi1.slice(begin, end);
			// });
			
			// $scope.sort = function(keyname){
   //                          $scope.sortKey = keyname;   
   //                          $scope.reverse = !$scope.reverse;
   //                  }





			$scope.SinhVien = SinhVien;
			$scope.SinhVienDefault = angular.copy($scope.SinhVien);
			
			$scope.hien_themHV = true;
			
			$scope.tuoi = '';
			
			$scope.addSinhVien = function(hoten, tuoi, lop){

				var temp = {id:'',hoten: hoten, tuoi: tuoi, lop: lop};
				temp.id = $scope.SinhVien.length+1;
				$scope.SinhVien.push(temp);
				$scope.hien_themHV = true;
				$scope.main = true;
				$location.path('/student');
				$scope.SinhVienDefault.push(temp);
				alert("  have successfully added ")

			};
			$scope.chuyenTabThemHS = function(){
				$location.path('/addStudent');
			}
			$scope.addLop = function(form){
				$scope.form = {
					name: ""
				};
				if (form.name == "") {
					alert("data must be entered in this field")
				}else{
					$scope.khoi1.push(form);
					$scope.setTab(5);
				}
				
			}
			$scope.tinhTuoi = function(ns){
				return (new Date().getFullYear() - ns.getFullYear());
			}

			//remove

			$scope.reMoveLop = function(khoi1,index){
				var index = $scope.khoi1.indexOf(khoi1);
				$scope.khoi1.splice(index,1);
			}

			$scope.reMoveSinhVien = function (SinhVien,index) {
							
				var index = $scope.SinhVien.indexOf(SinhVien);
				$scope.SinhVien.splice(index,1);
			}

			
			//edit
			$scope.indexclass = '';
			$scope.change_Main_Edit = false;
			$scope.change = false;
			$scope.saveEditlop = function(){
				$scope.khoi1[$scope.indexclass].name = $scope.formeditclass.name;
				$scope.change = false;
				$location.path('/class');
			}

			$scope.formeditclass = {
				name: "",
				khoi: ""
			};

			$scope.loadFormEdit = function(editclass, index){
				$scope.formeditclass.name = editclass.name;
				//$scope.formeditclass.khoi = $scope.formeditclass.name;
				$scope.indexclass = index;
			}
			$scope.loadFormEditclass = function (sinh) {
				
			}

			$scope.saveEdit = function(){
				$scope.change_Main_Edit = false;

				$location.path('/student');
				
			}

			//search
			$scope.search = {};
			$scope.Userinput = {};
			$scope.searchSinhVien = function () {
				
				var timtuoi = $scope.Userinput.tuoi;
				var timten = $scope.Userinput.hoten;
				var timlop = $scope.Userinput.lop;
					//$scope.SinhVienDefault.push();
				$scope.SinhVien = angular.copy(_.filter($scope.SinhVienDefault,function(x) {
					return ((timtuoi === null || timtuoi === undefined) || (timtuoi !== null && timtuoi !== undefined && $scope.tinhTuoi(x.tuoi) == timtuoi)) &&
							((timlop === null || timlop === undefined) || (timlop !== null && timlop !== undefined && x.lop.includes(timlop))) &&
							((timten === null || timten === undefined) || (timten !== null && timten !== undefined && x.hoten.includes(timten)));
				}));
			}
			$scope.SinhVien = SinhVien;
		});
		