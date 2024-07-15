var httpc = {
    get: function(url, func) {
        var xhr = cc.loader.getXMLHttpRequest();
        
        console.log(url);
        
        xhr.open("GET", url, true);
        
        xhr.onreadystatechange = function () {  
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {  
                err = false;  
            }
            else {  
                err = true;  
            }  
            var response = xhr.responseText;  
            console.log(func);
            func(err,response);  
        };  
        
        
        xhr.send(); 
    }, 
};

module.exports = httpc;
