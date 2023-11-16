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
        var taskObj = {
            'id': taskArr[taskArr.length - 1].id + 1,
            'pid': parseInt(touchKidChoose.dataset.pid),
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
