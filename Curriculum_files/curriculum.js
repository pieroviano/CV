// Page breaks are handled by CSS (break-inside: avoid on rows, repeating thead).
function split() {
    $("#print").hide();
    $("#printResume").hide();
    window.print();
    location.reload();
}

$(function () {
    $("#print").click(function () { split(); });
    $("#printResume").click(function () {
        document.title = "Viano Ionita Piero's resume";
        $("#other").hide();
        $("#title").text("Resume");
        split();
    });
});
