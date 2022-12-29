$(window).on("load",function () {
    var t1 = gsap.timeline();

    // set
    t1
    .set(
        '.resistance-colour', { duration: 0, opacity: 0,scale:0.8 })
    .set(
        '.stick', { duration:0 , x:-1000, scale:0.8 })
    .set('.panel',{
        duration:0, opacity:0,y:-20})
    .set('#amount-output',{
        scale:0.1,duration:0,opacity:0})
    for (var i=0;i<5;i++) {
        t1.set('#colour'+String(i),{
            duration:0 , y:-500
        })
    }
    t1.to('#colour1',{ duration:1,y:0},">1.3")
    .to('#colour2',{ duration:1,y:0},"<0.1")
    .to('#colour3',{ duration:1,y:0},"<0.2")
    .to('#colour4',{ duration:1,y:0},"<0.3")
    .to('.resistance-colour', { opacity: 1 }, 1.5)
    .to('.stick', { delay:1,duration:0.7 ,x:0,ease:"back"},'>')
    .to('.panel', {
        opacity:1,y:0
    })
    .to('.resistance-colour',{
        scale:1,ease:"back"
    },'>')
    .to('.stick',{
        scale:1,ease:"back"
    },'<')
    .to(
        '#amount-output',{
            scale:1,
            opacity:1,
            ease:"back"
        },">"
    )
});
