
import http, { Server } from "http";
import url, { URLSearchParams } from "url";

const host = "localhost";
const port = 3000;

function responder_Requisicao(requisicao, resposta) {
    if (requisicao.method === "GET") {

        const dados = new URLSearchParams(url.parse(requisicao.url).query);
        const tabuada = dados.get("tabuada");
        const sequencia = dados.get("sequencia");
        
        resposta.setHeader("Content-Type","text/html");
        resposta.write("<html>");
        resposta.write("<head>");
        resposta.write("<title></title>");        
        resposta.write("<meta charset='UTF-8'>");
        resposta.write("<head>");
        resposta.write("<body>");
        resposta.write("<tr> <th> Tabuada do" + tabuada + "</th> </tr>")
        if(tabuada && sequencia)
        {
            for(let i=0; i<=sequencia; i++)
            {
                let r=tabuada*i;
                resposta.write("<tr>")
                resposta.write("<td>")
                resposta.write(tabuada+"*"+i+"="+r)
                resposta.write("</td>")
                resposta.write("</tr>")
            }
        } else if(!tabuada && sequencia){
            for (let i = 0; i <= sequencia; i++) {
                let r = 0 * i;
                resposta.write("<tr>");    
                resposta.write("<td>");    
                resposta.write(0+"X"+i+"="+r);                
                resposta.write("</td>");    
                resposta.write("</tr>");    
            }
        } else if(tabuada && !sequencia){
                for (let i = 0; i <= 10; i++) {
                    let r = tabuada * i;
                    resposta.write("<tr>");    
                    resposta.write("<td>");    
                    resposta.write(tabuada+"X"+i+"="+r);                
                    resposta.write("</td>");    
                    resposta.write("</tr>");    
                }
        } else {
                resposta.write("<th>");
                resposta.write("Digite /?tabuada=3&sequencia=25 após o link para criar a tabuada");                
                resposta.write("</th>");    
                resposta.write("</tr>");    


            }
            resposta.write("</body>");
            resposta.write("</html>");
            resposta.end();

}
}

const servidor = http.createServer(responder_Requisicao);

servidor.listen(port, host, () => {

})