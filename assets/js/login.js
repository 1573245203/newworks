$(function() {
    // 从layui中提取form表单模块
    const { form } = layui
    $('.link a').click(function() {
        $('.layui-form ').toggle()
    })

    // 校验单表项
    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码只能是6到12位'
        ],
        samePass: function(value) {
            if (value !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        }
    })
    $('.reg-form').submit(function(e) {
        e.preventDefault()
        axios.post('http://api-breakingnews-web.itheima.net/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res);

                if (res.status !== 200) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功')
                $('.login-form a').click()
            })
    })

    // 实现登录功能
    $('.login-form').submit(function(e) {
        e.preventDefault()

        // 发送ajax
        axios.post('/api/login', $(this).serialize())
            .then(res => {
                console.log(res);
                // 校验请求失败
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token)
                    // 提示登录成功
                layer.msg('登录成功')
                    // 跳转到首页
                location.href = '../index.html'
            })
    })




})