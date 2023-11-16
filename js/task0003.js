// 用到li:first-child伪类选择器是方便指定该元素的直接子元素
var defaultCategory = document.querySelector('.menu-list li:first-child');

var taskList = document.querySelector('.task-list');


defaultCategory.classList.add('selected'); //向默认分类添加selected是为了表示已经默认选中状态
//用于显示所选分类的任务。该函数会清除任务列表，并添加所选分类的任务。
displayTasksForCategory(defaultCategory);

// 
function displayTasksForCategory(categoryElement) {
    //
    var tasks = categoryElement.querySelectorAll('ul li');

    // 
    taskList.innerHTML = '';

    //
    tasks.forEach(function (task) {
        taskList.appendChild(task.cloneNode(true));
    });

}

var btn = document.getElementById("addNew");
var hiddenWindow = document.getElementById("hiddenWindow");
//点击按钮显示窗口
btn.addEventListener('click', function () {
    hiddenWindow.style.display = 'block';
})

var confirm = document.getElementById("confirm");
var wCancel = document.getElementById("w-cancel");
//获取分类列表的ul元素
const categoryList = document.querySelector(".menu-list ul");

confirm.addEventListener('click', function () {
    //获取新分类名称和父分类值
    const newCategoryName = document.getElementById("newCategoryName");
    const parentCategory = document.getElementById("parentCategory");
    //检查新分类名称是否为空
    if (newCategoryName.value.trim() === '') {
        //trim（）方法是去除前后空格，如果去除了空格仍等于空格就说明用户没输入
        alert('新分类名称不能为空！');
        return;
    }

    //获取当前选中的分类并存储在selectedCategory中
    const selectedCategory = parentCategory.options[parentCategory.selectedIndex].text;
    //添加新分类到选中的分类下
    const newCategory = document.createElement('li');
    newCategory.innerHTML = `${newCategoryName.value}<span>(0)</span>`;

    //找到选中分类的ul，并添加新分类
    //categoryList.querySelectorAll("h4"): 这个方法会在categoryList元素下找到所有的h4标签，并返回一个NodeList。
    //Array.from(...): 这个函数把NodeList转换成一个数组，这样我们就可以使用数组的方法，如find
    //.find(h4 => h4.textContent.includes(selectedCategory)): 使用数组的find方法来找到第一个h4标签，其文本内容包含selectedCategory
    //.nextElementSibling: 这个属性获取当前元素（在这里是h4标签）的下一个兄弟元素，在这个例子中就是与选中的h4标签相邻的ul元素。
    const selectedUl = Array.from(categoryList.querySelectorAll("h4")).find(h4 => h4.textContent.includes(selectedCategory)).nextElementSibling;
    selectedUl.appendChild(newCategory);

    hiddenWindow.style.display = "none";
})

wCancel.addEventListener('click', function () {
    //点击取消后，隐藏弹出来的窗口
    hiddenWindow.style.display = 'none';
})

//利用本地存储查看所有任务和某分类所有任务

const defaultData = {
    categories: {
        '默认分类': [],
        '学英语': [],
        '百度ife项目': []
    }
};
//初始化数据
function initData() {
    if (!localStorage.getItem('taskData')) {
        localStorage.setItem('taskData', JSON.stringify(defaultData));
    }
}

//对本地存储的数据进行读取
function getTaskData() {
    return JSON.parse(localStorage.getItem('taskData'));
}

//显示任务和分类
function displayTasks() {
    const data = getTaskData();
    //清空现有的列表
    document.querySelector('.menu-list ul').innerHTML = '';
    //遍历分类和任务,创建列表项
    for (const category in data.categories) {
        const categoryEl = document.createElement('li');
        categoryEl.innerHTML = `<h4>${category}<span>(${data.categories[category].length})</span></h4>`;
        //添加任务到分类下
        const tasksEl = document.createElement('ul');
        for (const task of data.categories[category]) {
            const taskEl = document.createElement('li');
            taskEl.textContent = task.name;
            tasksEl.appendChild(taskEl);
        }
        categoryEl.appendChild(tasksEl);
        document.querySelector('.menu-list ul').appendChild(categoryEl);
    }
}

//添加新分类
function addCategory(categoryName) {
    const data = getTaskData();
    if (!data.categories[categoryName]) {
        data.categories[categoryName] = [];
        localStorage.setItem('taskData', JSON.stringify(data));
        displayTasks();
    }
}

//页面加载时初始化数据和显示任务
document.addEventListener('DOMContentLoaded', () => {
    initData();
    displayTasks();
    //     // localStorage.clear();

});





