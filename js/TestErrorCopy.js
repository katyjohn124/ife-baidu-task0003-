//初始化数据库
function initDataBase() {
    if (!localStorage.cate || !localStorage.childCate || !localStorage.task) {
        var cateText = [
            {
                "id": 0,
                "name": "默认主分类",
                "child": [0]
            }
        ];
        var childCateText = [
            {
                "id": 0,
                "name": "默认子分类",
                "child": [0],
                "pid": 0
            }
        ];
        var taskText = [
            {
                "id": 0,
                "pid": 0,
                "name": "使用说明",
                "finish": true,//表明任务是否为完成状态
                "date": "2023-11-09",
                "content": "左侧为分类列表<br/>右侧为当前分类下的任务列表<br/>右侧为任务详情<br/>可以添加删除分类，添加任务，修改任务，以及给任务标记是否完成等功能<br/><br/><span>byKatyjohn</span><br/>"
            }/*,
			{
				"id":1,
				"pid":0,
				"name":"使用",
				"finish":false,//表明任务是否为完成状态
				"date":"2023-11-10",
				"content":"右侧为任务详情<br/>可以添加删除分类，添加任务，修改任务，以及给任务标记是否完成等功能<br/><br/><span>byLuojiamin</span><br/>"
			}*/
        ];

        localStorage.cate = JSON.stringify(cateText);
        localStorage.childCate = JSON.stringify(childCateText);
        localStorage.task = JSON.stringify(taskText);
    }
};
initDataBase()

//初始化分类列表
// function initData() {
//     var cateList = document.getElementById('cateList');
//     // 对主分类读取数据
//     var categories = JSON.parse(localStorage.getItem('cate')) || [];
//     var kidCategories = JSON.parse(localStorage.getItem('childCate')) || [];
//     //对读取的数据进行页面动态渲染
//     categories.forEach(function (mainCate) {
//         var listItem = document.createElement('li');
//         //对渲染出来的数据弄成和原本的静态的样式一致
//         listItem.classList.add('category-item');
//         var title = document.createElement('h4');
//         title.textContent = mainCate.name;
//         var span = document.createElement('span');
//         span.textContent = "(" + mainCate.child.length + ")";
//         //添加到主分类列表
//         title.appendChild(span);
//         listItem.appendChild(title);
//         cateList.appendChild(listItem);

//         //对子分类进行动态渲染数据
//         var kidCateList = document.createElement('ul');//子分类的容器
//         mainCate.child.forEach(function (childId) {
//             var kidCate = kidCategories.find(function (subCate) { return subCate.id === childId });
//             if (kidCate) {
//                 var kidListItem = document.createElement('li');
//                 kidListItem.classList.add('kidCategory-item');
//                 //对渲染出来的数据弄成和原本的静态的样式一致
//                 var kidTitle = document.createElement('h5');
//                 kidTitle.textContent = kidCate.name;
//                 var kidSpan = document.createElement('span');
//                 kidSpan.textContent = "(" + kidCate.child.length + ")";
//                 //添加到子列表
//                 kidTitle.appendChild(kidSpan);
//                 kidListItem.appendChild(kidTitle);
//                 kidCateList.appendChild(kidListItem);

//             }
//         });
//         //把子列表添加到主列表
//         listItem.appendChild(kidCateList);

//     })

//     //页面加载好后，选择默认分类并触发点击事件
//     defaultCategoryClick();
// }

//初始化分类列表
function initData() {
    var cateList = JSON.parse(localStorage.cate);
    var childCateList = JSON.parse(localStorage.childCate);
    var cateListElement = document.getElementById('cateList');

    // 清空现有的列表
    cateListElement.innerHTML = '';

    // 遍历主分类列表
    for (var i = 0; i < cateList.length; i++) {
        var cateItem = document.createElement('li');
        cateItem.className = 'category-item';
        cateItem.dataset.category = 'deletable';
        cateItem.innerHTML = '<h4>' + cateList[i].name + '</h4>';

        var childCateUl = document.createElement('ul');

        // 遍历子分类列表
        for (var j = 0; j < childCateList.length; j++) {
            if (childCateList[j].pid === cateList[i].id) {
                var childCateItem = document.createElement('li');
                childCateItem.className = 'kidCategory-item';
                childCateItem.innerHTML = '<h5>' + childCateList[j].name + '</h5>';
                childCateUl.appendChild(childCateItem);
            }
        }

        cateItem.appendChild(childCateUl);
        cateListElement.appendChild(cateItem);
    }
    //页面加载好后，选择默认分类并触发点击事件
    defaultCategoryClick()
}
//初始化任务列表
function initTasks() {
    var taskList = JSON.parse(localStorage.task);
    var taskListElement = document.getElementById('task-list');

    // 清空现有的任务列表
    taskListElement.innerHTML = '';


    // 遍历任务列表
    for (var i = 0; i < taskList.length; i++) {
        var taskItem = document.createElement('li');
        // 为任务元素添加删除图标
        var taskIcon = document.createElement('i');
        taskIcon.className = 'iconfont icon-remove_circle_outlined';
        taskIcon.style.display = 'none'; // 默认隐藏图标
        // 添加鼠标经过事件
        taskItem.addEventListener('mouseover', function (event) {
            var icon = event.currentTarget.querySelector('.icon-remove_circle_outlined');//获取当前鼠标经过的元素
            icon.style.display = 'inline'; // 鼠标经过时显示图标
        });
        // 添加鼠标离开事件
        taskItem.addEventListener('mouseout', function (event) {
            var icon = event.currentTarget.querySelector('.icon-remove_circle_outlined');
            icon.style.display = 'none'; // 鼠标离开时隐藏图标
        });

        taskItem.className = 'task-item';
        taskItem.dataset.taskId = taskList[i].id;

        // 创建一个表示任务时间的元素
        var taskTime = document.createElement('div');
        taskTime.className = 'task-time';
        taskTime.innerHTML = taskList[i].date;

        // 创建一个表示任务名称的元素
        var taskName = document.createElement('h5');
        taskName.innerHTML = taskList[i].name;

        //如果任务名称是"使用说明"，则为它添加ID
        if (taskList[i].name === '使用说明') {
            taskName.id = 'useInfo';
        }

        // 先添加任务时间元素，然后添加任务名称元素
        taskItem.appendChild(taskTime);
        taskItem.appendChild(taskName);
        taskItem.appendChild(taskIcon); // 将图标添加到任务列表项中

        taskItem.addEventListener('click', function () {
            // 移除其他任务的选中状态
            var otherTasks = document.querySelectorAll('#task-list .choose');
            for (var i = 0; i < otherTasks.length; i++) {
                otherTasks[i].classList.remove('choose');
            }

            // 为被点击的任务添加选中状态
            this.classList.add('choose');
        });

        taskListElement.appendChild(taskItem);
        //页面刷新自动选中第一个任务
        if (i === 0) {
            taskItem.click();
        }
    }
    // 在任务列表创建完毕后，为useInfo元素添加事件监听器
    var useInfoElement = document.getElementById('useInfo');
    if (useInfoElement) {
        useInfoElement.addEventListener('click', initDetail);
    }
}

//获取任务详情页并初始化渲染到界面,一刷新自动点击第一个任务后显示详情页
function initDetail() {
    //获取选中的是哪个任务
    var element = document.querySelector('#task-list .choose');
    // var taskFinish = document.getElementById('taskFinish').checked;
    console.log('Selected task:', element);
    if (element) {
        //判断ele是否存在
        var taskId = element.dataset.taskId;
        console.log(taskId);//打印出来的是选中的任务的id

        //获取本地存储的tasks数据
        var tasks = JSON.parse(localStorage.getItem('task')) || [];

        //根据id找到对应的任务
        var taskObj = tasks.find(function (task) {
            return task.id === parseInt(taskId);
        });
        console.log(taskObj);//打印出来的是选中的任务的对象

        //渲染到页面上
        document.querySelector('#disTitle').innerHTML = taskObj.name;
        document.querySelector('#disDate').innerHTML = taskObj.date;
        document.querySelector('#disContent').innerHTML = taskObj.content;

        //判断是否完成
        // if (taskObj.finish) {
        //     document.querySelector('#disFinish').checked = true;
        // } else {
        //     document.querySelector('#disFinish').checked = false;
        // }
    }
}

// var addOne = document.getElementById('addOne');
// var modify = document.getElementById('modify');
// var detail = document.getElementById('detail');

// addOne.addEventListener('click', function () {
//     modify.style.display = 'block';
//     console.log('弹出窗口');

//     detail.style.display = 'none';
//     console.log('隐藏详情页');
// })


//默认分类点击事件
function defaultCategoryClick() {
    //因没有默认分类id，所以选择第一个分类项
    var defaultCategory = document.querySelector('.category-item:first-child');
    //检查元素是否是存在的，存在即可触发点击事件；
    if (defaultCategory) {
        defaultCategory.click();

        //选中后添加背景颜色
        // defaultCategory.style.bacgroundColor = 'lightblue';
        console.log('默认分类已经选中')

    }
}

//新增分类-绑定弹窗
var addNew = document.getElementById('addNew');
var hiddenWindow = document.getElementById('hiddenWindow');
addNew.addEventListener('click', function () {
    hiddenWindow.style.display = 'block';
    console.log('弹出窗口');
    //调用函数，页面刷新后，一点击新增就更新父分类选择列表
    var cateArr = JSON.parse(localStorage.getItem('cate')) || [];
    updateParentCategoryList(cateArr);
})

var confirm = document.getElementById('confirm');
//定义getObjByKey函数
function getObjByKey(array, key, value) {
    return array.find(function (element) {
        return element[key] === value;
    })
}
confirm.addEventListener('click', function () {
    var cateName = document.getElementById('newCategoryName').value.trim();
    var selectValue = document.getElementById('parentCategory').value;
    console.log(selectValue);
    var cateArr = JSON.parse(localStorage.getItem('cate')) || [];//获取当前本地存储的分类数组
    var cateKidArr = JSON.parse(localStorage.getItem('childCate')) || [];//获取当前本地存储的子分类数组

    //判断input输入是否为空
    if (!cateName) {
        alert('新分类名称不能为空！');
        return;
    } else if (selectValue === '-1') {
        alert('不能添加至默认分类！');
        return;
    } else if (cateName.length > 10) {
        alert('输入长度不能超过10个字符');
        return;
    } else if (getObjByKey(cateArr, 'name', cateName)) {
        alert('不能输入相同名称的主分类')
        return;
    }
    //以上条件判断语句使用了return是为了防止出了错误警告还继续执行后面的代码
    //判断父子分类添加的逻辑
    console.log('selectValue before if:', selectValue);  // 打印if判断之前的selectValue的值
    if (selectValue === '0') {
        console.log('Adding new main category');  // 打印正在添加新主分类的信息

        //创建新的分类对象
        var newCategory = {

            'id': cateArr[cateArr.length - 1].id + 1,
            'name': cateName,
            'child': [],
            // parent: selectValue
        };
        //添加新分类的数据到本地存储
        cateArr.push(newCategory);
        localStorage.setItem('cate', JSON.stringify(cateArr));
        //更新页面上的分类列表
        updateCategoryList(cateArr);
        //更新完后隐藏窗口
        hiddenWindow.style.display = 'none';
        //更新父分类的选择列表
        updateParentCategoryList(cateArr);
    } else {
        console.log('这里要添加新子分类');  // 打印正在添加新子分类的信息

        //否则添加新子分类
        var newKidCategory = {
            'id': cateKidArr[cateKidArr.length - 1].id + 1,
            'name': cateName,
            'child': [],
            'pid': parseInt(selectValue)
        };
        //添加新子分类到本地存储
        cateKidArr.push(newKidCategory);
        localStorage.setItem('childCate', JSON.stringify(cateKidArr));
        // 更新主分类的 child 字段
        var parentCategory = cateArr.find(cate => cate.id === parseInt(selectValue));
        if (parentCategory) {
            parentCategory.child.push(newKidCategory.id);
            localStorage.setItem('cate', JSON.stringify(cateArr));
        }

        updateCategoryList(cateArr); // 更新分类列表
    }
    console.log('selectValue after if:', selectValue);  // 打印if判断之后的selectValue的值

    //更新完后隐藏窗口
    hiddenWindow.style.display = 'none';



})

//更新分类list
// function updateCategoryList(cateArr) {
//     var cateListElement = document.getElementById('cateList');
//     cateListElement.innerHTML = '';//清空现有的列表
//     //遍历渲染添加列表，并再次渲染和原静态页面的样式
//     cateArr.forEach(function (category) {
//         var categoryListItem = document.createElement('li');
//         categoryListItem.classList.add('category-item');

//         var mainTitle = document.createElement('h4');
//         mainTitle.textContent = category.name;

//         var mainSpan = document.createElement('span');
//         mainSpan.textContent = "(" + category.child.length + ")";

//         mainTitle.appendChild(mainSpan);
//         categoryListItem.appendChild(mainTitle);
//         // categoryListItem.textContent = category.name;
//         cateListElement.appendChild(categoryListItem);


//         // //对子列表更新渲染
//         // var kidCateList = document.createElement('ul');//子分类的容器
//         // category.child.forEach(function (childId) {
//         //     var kidCate = kidCategories.find(function (subCate) { return subCate.id === childId });
//         //     if (kidCate) {
//         //         var kidListItem = document.createElement('li');
//         //         kidListItem.classList.add('kidCategory-item');
//         //         //对渲染出来的数据弄成和原本的静态的样式一致
//         //         var kidTitle = document.createElement('h5');
//         //         kidTitle.textContent = kidCate.name;
//         //         var kidSpan = document.createElement('span');
//         //         kidSpan.textContent = "(" + kidCate.child.length + ")";
//         //         //添加到子列表
//         //         kidTitle.appendChild(kidSpan);
//         //         kidListItem.appendChild(kidTitle);
//         //         kidCateList.appendChild(kidListItem);

//         //     }
//         // });
//         // //把子列表添加到主列表
//         // listItem.appendChild(kidCateList);
//     });
// }

//更新分类list
function updateCategoryList(cateArr) {
    console.log('开始更新分类列表', cateArr);
    var cateListElement = document.getElementById('cateList');
    cateListElement.innerHTML = '';//清空现有的列表
    var cateKidArr = JSON.parse(localStorage.getItem('childCate')) || [];//获取当前本地存储的子分类数组

    //遍历渲染添加列表，并再次渲染和原静态页面的样式
    cateArr.forEach(function (category) {
        var categoryListItem = document.createElement('li');
        //对所有的分类添加choose类选择器
        categoryListItem.addEventListener('click', function () {
            //移除其他分类的choose
            var categoryItems = document.querySelectorAll('.category-item');
            categoryItems.forEach(function (item) {
                item.classList.remove('choose');
            });
            //为当前点击的分类添加choose类
            this.classList.add('choose');
        })

        //添加删除按钮
        var icon = document.createElement('i');
        icon.classList.add('iconfont');
        icon.classList.add('icon-clear');
        icon.style.display = 'none'; // 默认隐藏图标
        // 添加鼠标经过事件
        categoryListItem.addEventListener('mouseover', function () {
            //是默认分类时，不显示删除图标
            if (category.name === '默认主分类') {
                return;
            } else {
                icon.style.display = 'inline'; // 鼠标经过时显示图标
            }
        });
        categoryListItem.addEventListener('mouseout', function () {
            icon.style.display = 'none'; // 鼠标离开时隐藏图标
        });

        categoryListItem.classList.add('category-item');

        var mainTitle = document.createElement('h4');
        mainTitle.textContent = category.name;

        var mainSpan = document.createElement('span');
        mainSpan.textContent = "(" + category.child.length + ")";

        mainTitle.appendChild(mainSpan);
        categoryListItem.appendChild(mainTitle);
        categoryListItem.appendChild(icon); // 将图标添加到主分类列表项中
        cateListElement.appendChild(categoryListItem);

        //对子列表更新渲染
        var kidCateList = document.createElement('ul');//子分类的容器
        category.child.forEach(function (childId) {
            var kidCate = cateKidArr.find(function (subCate) { return subCate.id === childId });
            if (kidCate) {
                var kidListItem = document.createElement('li');
                //对子分类添加添加删除图标
                var kidIcon = document.createElement('i');
                kidIcon.classList.add('iconfont');
                kidIcon.classList.add('icon-clear');
                kidIcon.style.display = 'none'; // 默认隐藏图标
                // 添加鼠标经过事件
                kidListItem.addEventListener('mouseover', function () {
                    if (kidCate.name === '默认子分类') {
                        return;
                    } else {
                        kidIcon.style.display = 'inline'; // 鼠标经过时显示图标
                        event.stopPropagation();//阻止事件冒泡，防止触发点击主分类的事件
                    }

                });
                // 添加鼠标离开事件
                kidListItem.addEventListener('mouseout', function () {
                    kidIcon.style.display = 'none'; // 鼠标离开时隐藏图标

                });
                kidListItem.classList.add('kidCategory-item');
                //对子分类添加choose类选择器
                kidListItem.addEventListener('click', function (event) {
                    //阻止事件冒泡，防止触发点击主分类的事件
                    event.stopPropagation();
                    //移除其他分类的choose
                    var kidCategoryItems = document.querySelectorAll('.category-item, .kidCategory-item');
                    kidCategoryItems.forEach(function (item) {
                        item.classList.remove('choose');
                    });

                    //为当前点击的分类添加choose类
                    this.classList.add('choose');
                })
                //对渲染出来的数据弄成和原本的静态的样式一致
                var kidTitle = document.createElement('h5');
                kidTitle.textContent = kidCate.name;
                var kidSpan = document.createElement('span');
                kidSpan.textContent = "(" + kidCate.child.length + ")";
                //添加到子列表
                kidTitle.appendChild(kidSpan);
                kidListItem.appendChild(kidTitle);
                kidListItem.appendChild(kidIcon); // 将图标添加到子分类列表项中
                kidCateList.appendChild(kidListItem);
            }
        });
        //把子列表添加到主列表
        categoryListItem.appendChild(kidCateList);
    });

    console.log('完成更新分类列表', cateArr);
}

//更新父分类选择list
function updateParentCategoryList(cateArr) {
    console.log('更新父分类选择选项', cateArr);
    var parentCateSelect = document.getElementById('parentCategory');
    //
    parentCateSelect.innerHTML = '<option value="0">请选择一个父分类</option>';
    cateArr.forEach(function (category) {
        var optionItem = document.createElement('option');
        optionItem.value = category.id;
        optionItem.textContent = category.name;
        parentCateSelect.appendChild(optionItem);
    });
    console.log('完成父分类选择选项', cateArr);
}

//用户取消新增分类
var wCancel = document.getElementById('w-cancel');
wCancel.addEventListener('click', function () {
    hiddenWindow.style.display = 'none';
    console.log('取消新增')
})

//获取所有的分类元素
var categoryItems = document.querySelectorAll('.category-item');


// //先判断选择的是哪个分类下的子分类
// function getSelectedCategory() {
//     var modify = document.getElementById('modify');
//     var detail = document.getElementById('detail');
//     var touchChoose = document.querySelector('.category-item.choose');//获取选中的分类
//     console.log(touchChoose);
//     if (touchChoose == null) {
//         alert('没有选中的分类！');
//         return;
//     }
//     var tag = touchChoose.tagName.toLowerCase();//获取选中的分类的标签名
//     if (tag == 'h5' && touchChoose.getAttribute(childCateid) == 0) {
//         alert('默认子分类不能添加任务！');
//         return;
//     } else if (tag == 'h5') {
//         //隐藏详情页窗口
//         detail.style.display = 'none';
//         console.log('隐藏详情页');
//         //打开编辑页窗口
//         modify.style.display = 'block';
//         console.log('弹出窗口');
//         //
//     } else {
//         alert('请先添加子分类！');
//         return;
//     }
// }

function getSelectedCategory() {
    return document.querySelector('.category-item.choose');
}

function getSelectedKidCategory() {
    return document.querySelector('.kidCategory-item.choose');
}

function addTask() {
    var touchMainChoose = getSelectedCategory();
    console.log(touchMainChoose);

    if (touchMainChoose) {
        var touchKidChoose = getSelectedKidCategory(touchMainChoose);
        console.log(touchKidChoose);

        if (touchKidChoose && touchKidChoose.textContent.includes('默认子分类')) {
            alert('默认子分类不能添加任务！');
            return;
        } else if (!touchKidChoose) {
            alert('请先添加子分类！');
            return;
        } else {
            createTask(touchKidChoose);
        }
    } else {
        alert('没有选中的分类，请选择一个分类！');
        return;
    }
}

function createTask(touchKidChoose) {
    var modify = document.getElementById('modify');
    var detail = document.getElementById('detail');
    //隐藏详情页窗口
    detail.style.display = 'none';
    console.log('隐藏详情页');
    //打开编辑页窗口
    modify.style.display = 'block';
    console.log('弹出窗口');
    //用户保存任务
    var saveBtn = document.getElementById('save');
    saveBtn.addEventListener('click', function () {
        saveTask(touchKidChoose);
        console.log('保存任务');
    })

    //用户取消保存任务
    var cancelBtn = document.getElementById('cancel');
    cancelBtn.addEventListener('click', function () {
        modify.style.display = 'none';
        console.log('取消保存任务');
    })
}

function saveTask(touchKidChoose) {
    var taskName = document.getElementById('title').value.trim();
    var taskDate = document.getElementById('time').value;
    var taskContent = document.getElementById('content').value.trim();
    // var taskFinish = document.getElementById('taskFinish').checked;
    var taskArr = JSON.parse(localStorage.getItem('task')) || [];
    if (!taskName) {
        alert('任务名称不能为空！');
        return;
    } else if (taskName.length > 12) {
        alert('任务名称长度不能超过12个字符！');
        return;
    } else if (!taskDate) {
        alert('请选择任务日期！');
        return;
    } else if (!taskContent) {
        alert('任务内容不能为空！');
        return;
    } else {
        // 修改开始：确保pid正确设置
        var pid = parseInt(touchKidChoose.dataset.pid);
        if (isNaN(pid)) {
            alert('子分类ID不正确！');
            return;
        }
        // 处理任务id生成逻辑
        var newTaskId = taskArr.length > 0 ? taskArr[taskArr.length - 1].id + 1 : 1;
        var taskObj = {
            'id': newTaskId,
            'pid': pid, // 使用正确的pid
            'name': taskName,
            'finish': false,
            'date': taskDate,
            'content': taskContent
        };
        taskArr.push(taskObj);
        localStorage.setItem('task', JSON.stringify(taskArr));

        //更新子分类的child数组
        var cateKidArr = JSON.parse(localStorage.getItem('childCate')) || [];
        for (var i = 0; i < cateKidArr.length; i++) {
            if (cateKidArr[i].id === parseInt(taskObj.pid)) {
                cateKidArr[i].child.push(taskObj.id);
                break;
            }

        }
        localStorage.setItem('childCate', JSON.stringify(cateKidArr));

        //更新任务列表
        initTasks();

        // //取消之前选中的任务
        // var selectedTask = document.querySelector('#task-list.choose');
        // if (selectedTask) {
        //     selectedTask.classList.remove('choose');
        // }
        // //选中新添加的任务
        // var newTask = document.querySelector('.task-item[taskid="' + taskObj.id + '"]');
        // if (newTask) {
        //     newTask.classList.add('choose');
        // }

        //更新任务详情页
        initDetail();
        //更新完后隐藏窗口
        document.querySelector(".modify").style.display = "none";
        console.log('隐藏编辑页');
        //显示详情界面并且详情界面显示刚刚添加的任务
        document.querySelector('.detail').style.display = "block";
        console.log('显示详情页');
    }
    //每添加任务后，调用updateTaskCount函数更新任务数量
    updateTaskCount();
}
var addOne = document.getElementById('addOne');
addOne.addEventListener('click', addTask);

//点击编辑图标显示编辑页
// var edit = document.querySelector('.edit');
// var modify = document.getElementById('modify');
// var detail = document.getElementById('detail');
// edit.addEventListener('click', function (event) {
//     //阻止链接默认行为
//     event.preventDefault();
//     //隐藏详情页窗口
//     detail.style.display = 'none';
//     //打开编辑页窗口
//     modify.style.display = 'block';
//     //调用saveTask函数，保存任务
//     saveTask();

// })


//点击打钩图标标记任务完成并隐藏set盒子两个图标
var finish = document.querySelector('.finish');
finish.addEventListener('click', function () {
    var taskList = JSON.parse(localStorage.task);
    var selectedTask = document.querySelector('#task-list .choose');
    if (selectedTask) {
        var taskId = selectedTask.dataset.taskId;
        var taskObj = taskList.find(function (task) {
            return task.id === parseInt(taskId);
        });
        if (taskObj) {
            taskObj.finish = true;
            localStorage.setItem('task', JSON.stringify(taskList));
            initTasks();
            initDetail();

        }
    }
})

//获取任务数量
function getTaskCount() {
    var tasks = localStorage.getItem('task');
    if (tasks) {
        tasks = JSON.parse(tasks);
        return tasks.length;
    }
    return 0;
}

//更新任务数量
function updateTaskCount() {
    const taskCount = getTaskCount();
    document.getElementById('totalTasks').innerHTML = `(${taskCount})`;
}

//删除分类和子分类



//页面加载完成时，调用上述函数
window.onload = function () {
    initData();
    initTasks();
    initDetail();
    var cateArr = JSON.parse(localStorage.getItem('cate')) || [];
    updateCategoryList(cateArr);
    updateParentCategoryList(cateArr);
    // console.log(cateArr);
    updateTaskCount()
}



