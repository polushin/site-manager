<div style="padding: 10px 20px 10px 20px;">
    <?=$this->Form->input('content', ['type'=>'textarea']);?>
    <?=$this->Form->button('Send', ['id'=>'send-button'])?>
</div>


<script>
    $(document).ready(function() {
        $('#send-button').click(function(){
            var content = $('#content').val();

            $.ajax({
                dataType: "json",
                type: "POST",
                url: '/sites/index.json',
                data: JSON.stringify({'content' : content}),
                success: function(data){
                    console.log(data);
                },
                error: function(){
                    alert('Server error');
                }
            });
        });
    });

</script>


