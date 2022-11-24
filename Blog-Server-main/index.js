const express = require('express')
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')
const jwt = require('jsonwebtoken');
const internal = require('stream');
const app = express()


app.use(express.static(path.join(__dirname, './public')));
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/blog-admin')
app.use(require('cors')())


// 创建文章数据库模型
const Article = mongoose.model('Article', new mongoose.Schema({
  title: {
    type: String
  },
  describe: {
    type: String
  },
  body: {
    type: String
  },
  time: {
    type: String
  },
  class: {
    type: String
  },
  src: {
    type: String
  }
}))
// 创建用户数据库模型
const User = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
}))

// 创建留言板数据库模型
const Message = mongoose.model('Message', new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  text: {
    type: String
  },
  time: {
    type: String
  }
}))
//创建标签数据库模型
const Tag = mongoose.model('Tag', new mongoose.Schema({
  TagName: {
    type: String
  },
  class: {
    type: String
  }
}))
//创建图片数据库模型
const Img = mongoose.model('Img', new mongoose.Schema({
  ImgType: {
    type: String
  },
  ImgLink: {
    type: String
  }
}))
//创建资源类型数据库模型
const ResType = mongoose.model('ResType', new mongoose.Schema({
  ResType: {
    type: String
  },
  ResourceNo: {
    type: String
  }
}))
//创建资源数据库模型
const Resource = mongoose.model('Resource', new mongoose.Schema({
  ResourceNo: {
    type: String
  },
  ResourceLogo: {
    type: String
  },
  ResourceName: {
    type: String
  },
  ResourceLink: {
    type: String
  },
  describe: {
    type: String
  },
  isDelete: {
    type: Boolean
  }
}))


const SECRET = 'katoumegumi'

// 获取用户信息
app.get('/api/users', async (req, res) => {
  const list = await User.find()
  res.send(list)
})

// 注册接口
app.post('/api/reg', async (req, res) => {
  const user = await User.create(req.body)
  console.log(user);
})


// 登录接口
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  })
  if (!user) {
    return res.status(422).send({
      message: "用户名不存在",
    })
  }
  const isPasswordValid = (user.password == req.body.password)
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    res.status(422).send({
      message: "密码错误",
    })
  }
  const token = jwt.sign({
    id: String(user._id),
  }, SECRET)
  res.send({
    user,
    token: token
  })
})

// 添加留言
app.post('/api/message/add', async (req, res) => {
  const message = await Message.create(req.body)
  res.send(message)
})

// 查询所有留言
app.get('/api/message/find', async (req, res) => {
  const message = await Message.find()
  res.send(message)
})
// 删除留言
app.delete('/api/message/del/:id', async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

app.get('/', async (req, res) => {
  res.send('index')
})
// 新增文章
app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})

// 文章列表
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find()
  res.send(articles)
})
// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

// 文章搜索
app.get('/api/articles/search/:search', async (req, res) => {
  const article = await Article.find({
    $or: [{
      title: {
        $regex: req.params.search
      }
    },
    {
      body: {
        $regex: req.params.search
      }
    }
    ]
  })
  res.send(article)
})
// 文章分类
app.get('/api/articles/class/:search', async (req, res) => {
  const article = await Article.find({
    $or: [{
      class: {
        $regex: req.params.search
      }
    }]
  })
  res.send(article)
})

// 文章详情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article)
})
// 修改文章
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})
// 通过class获取文章信息
app.get('/api/articles/getarticlesByClass/:class', async (req, res) => {
  const article = await Article.find({
    class: req.params.class
  });
  //res.send(req.params.class);
  res.send(article)
})
//添加标签
app.post('/api/Tag/addTag', async (req, res) => {
  const tag = await Tag.create(req.body)

  res.send(tag)
})
//获取所有标签+标签数量
app.get('/api/Tag/getAllTag', async (req, res) => {
  // 通过分组获取文章列表中已有标签的数量列表
  let listTargets = await Article.aggregate([{ "$group": { _id: "$class", "count": { "$sum": 1 } } }])
  const tag = await Tag.find();
  console.log(listTargets);
  let p = new Promise((res, row) => {
    let arr = []
    for (let i = 0; i < tag.length; i++) {
      let index = -1;
      for (let j = 0; j < listTargets.length; j++) {
        if (tag[i].class == listTargets[j]._id) {
          index = j;
          break;
        }
      }
      let obj = {
        _id: tag[i]._id,
        class: tag[i].class,
        num: 0
      }
      if (index == -1) {
        arr.push(obj)
      } else {
        console.log(listTargets[index]);
        obj.num = listTargets[index].count;
        arr.push(obj)
      }
    }
    console.log(arr);
    res(arr);
  })
  p.then(ress => {
    res.send(ress)
  })
})
//通过class查询标签
app.get('/api/Tag/getTagByClass/:class', async (req, res) => {
  const tag = await Tag.find({
    class: req.params.class
  });
  //res.send(req.params.class);
  res.send(tag)
})
// 删除标签
app.delete('/api/Tag/:id', async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})





// Markdown图片添加

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './public/resource'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
}).single('imgFile');


app.post('/api/upload_images', function (req, res) {
  upload(req, res, function (err) {
    console.log('-----------------开始上传------------------');
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end(err.message);
      return
    }
    let url = 'http://' + req.headers.host + '/resource/' + req.file.originalname
    res.writeHead(200);
    res.end(JSON.stringify({
      'url': url
    }));
    console.log('-----------------上传完成------------------');
    console.log('-----------------文件信息: ');
    console.log(req.file ? req.file : '文件错误');
  })
})
// 增加图片链接
app.post('/api/addimg', async (req, res) => {
  const imgmsg = await Img.create(req.body)
  res.send(imgmsg)

})
// 随机获取图片
app.get('/api/img/getimg', async (req, res) => {
  // 获取图片
  const img = await Img.find();
  res.send(img)

})

// 添加资源类型
app.post('/api/addResType', async (req, res) => {
  const restype = await ResType.create(req.body)
  res.send(restype)
})
// 获取所有资源类型
app.get('/api/resource/getAllResType', async (req, res) => {
  const restype = await ResType.find();
  res.send(restype)
})
//添加资源
app.post('/api/addResource', async (req, res) => {
  const resource = await Resource.create(req.body)
  res.send(resource)
})
// 通过资源类型获取资源
app.get('/api/resource/getAllResourceByNo/:ResourceNo', async (req, res) => {
  const resource = await Resource.find({
    ResourceNo: req.params.ResourceNo
  });
  res.send(resource)
})
// 删除资源
app.delete('/api/resource/deleteResource/:id', async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})




app.listen(3001, () => {
  console.log('http://localhost:3001');
})