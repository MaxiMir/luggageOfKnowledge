<!-- # FETCH + PHP -->
<script>      
    // ...
    const data = [/* ... some data */];
    const fetchOptions = {
        method: 'POST',
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };


    fetch('/ajax/calc.php', fetchOptions)
        .then(data => data.json())
        .catch(e => alert('Возникла ошибка при отправке...'));

    // конвертируем картинку в base64
    function getBase64Image(img) { 
        const canvas = document.createElement("canvas"); 
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d"); 
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpg"); 

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }        
</script>

<?php

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    
    if ($contentType === "application/json") {
        $response = ['result', 'success'];
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);
        
        if (!is_array($decoded)) {
            $response = ['result', 'error'];
        } else {
            // ... some code
        }
        
        echo json_encode($response);
    }

    function base64_to_jpeg($base64_string, $output_file) 
    {
        $ifp = fopen($output_file, "wb");    
        $data = explode(',', $base64_string);
        
        fwrite($ifp, base64_decode($data[1]));
        fclose($ifp);
        
        return $output_file;
    }