$(window).on("load",function () {
    // init
    let colours = ["黑", "棕", "紅", "橙", "黃", "綠", "藍", "紫", "灰", "白", "金", "銀", "無"]
    colour = {
        "黑": {
            color: "black",
            amount: "0"
        },
        "棕": {
            color: "brown",
            amount: "1"
        },
        "紅": {
            color: "red",
            amount: "2"
        },
        "橙": {
            color: "orange",
            amount: "3"
        },
        "黃": {
            color: "yellow",
            amount: "4"
        },
        "綠": {
            color: "green",
            amount: "5"
        },
        "藍": {
            color: "blue",
            amount: "6"
        },
        "紫": {
            color: "purple",
            amount: "7"
        },
        "灰": {
            color: "gray",
            amount: "8"
        },
        "白": {
            color: "white",
            amount: "9"
        },
        "金": {
            color: "gold",
            amount: "10%"
        },
        "銀": {
            color: "sliver",
            amount: "5%"
        },
        "無": {
            color: "#EEEDB5",
            amount: "3%"
        }
    }
    let option = ``

    colours = ["黑", "棕", "紅", "橙", "黃", "綠", "藍", "紫", "灰", "白"]
    for (var index in colours) {
        option += `<option class="color-${index}" value="${index}">${colours[index]}</option>`
    }
    $(".select").each(function (i) {
        if (i === 3) {
            colours = ["黑", "棕", "紅", "橙", "黃", "綠", "藍", "紫", "灰", "白", "金", "銀", "無"]
            option = ``
            for (var index in colours) {
                option += `<option class="color-${index}" value="${index}">${colours[index]}</option>`
            }
            $(this).html(option);
        } else {
            $(this).html(option);
        }
    });
    $("#colour4").val(10)
    $(".select").each(function () {
        $(this).css("background-color", colour[$(this).children("option:selected").html()]["color"])
    });
    colorShow()
    amountShow()
    // change

    colourChange(amountChange)
    amountChange(colourChange)

});

function colourChange(func) {
    $(".select").on("change", function () {
        $(this).css("background-color", colour[$(this).children("option:selected").html()]["color"])
        colorShow()
        amountShow()

        func()
    });
}   

function amountChange(func) {
    $(".output").on("change", function () {
        let data = $(this).val()
        if (data[data.length - 1] === "k" || data[data.length - 1] === "K") {
            data = data.substring(0, data.length - 1)
            data = parseFloat(data * 1000)
        } else if (data[data.length - 1]=== "m" || data[data.length - 1]=== "M") {
            data = data.substring(0, data.length - 1)
            data = parseFloat(data * 1000000)
        } else if (data[data.length - 1]=== "g" || data[data.length - 1]=== "G") {
            data = data.substring(0, data.length - 1)
            data = parseFloat(data * 1000000000)
        } else if (data[data.length - 1]=== "t" || data[data.length - 1]=== "T") {
            data = data.substring(0, data.length - 1)
            data = parseFloat(data * 1000000000000)
        }
        if (data.length === 1) {
            $("#colour1").val(0)
            $("#colour2").val(data[0])
            $("#colour3").val(0)
            colorShow()
            $(".select").each(function () {
                $(this).css("background-color", colour[$(this).children("option:selected").html()]["color"])
            });
        } else {
            data = String(data)
            let third = Math.log10(parseInt("1" + data.substring(2, data.length)))
            $("#colour1").val(data[0])
            $("#colour2").val(data[1])
            $("#colour3").val(third)
            colorShow()
            $(".select").each(function () {
                $(this).css("background-color", colour[$(this).children("option:selected").html()]["color"])
            });
        }
        func()
    })
}

function colorShow() {
    result = ""
    $(".select option:selected").each(function () {
        result += $(this).html()
    })
    $("#color-output").html(result);
}

function amountShow() {
    result = ""
    temp = []
    $(".select option:selected").each(function () {
        temp.push($(this).html())
    })
    number = Number(
        colour[temp[0]]["amount"] + colour[temp[1]]["amount"]
    )
    number = number * (
        Math.pow(10, Number(colour[temp[2]]["amount"]))
    )
    unit = ""
    if (number > 10) {
        if (number % 100000000000 === 0) {
            unit = "T"
            number = number / 1000000000000
        } else if (number % 100000000 === 0) {
            unit = "G"
            number = number / 1000000000
        } else if (number % 100000 === 0) {
            unit = "M"
            number = number / 1000000
        } else if (number % 100 === 0) {
            unit = "k"
            number = number / 1000
        }
    }
    result += `<span style="font-size:30px;"><input class="text-center p-0 output" value="${number + unit}"></input></span><span style="font-size:10px;">+-${colour[temp[3]]["amount"]}</span>`
    $("#amount-output").html(result);
}