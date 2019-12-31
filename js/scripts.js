/* variable qui va compterle nombre d'erreur */
var cpt = 0;

/* variable qui va stocker l'index du tableau dictionnaire pour garder le mot à trouver */
var indexDictionnaire;

/* tableau qui va stocker toute les lettres entrées par le joueur */
var tableauLettreTeste = [];

/* tableau qui va stocker les lettres pour l'affichage du mot à trouver */
var tableauWord = [];

/* flag 1st letter enter */
var flag = true;

/* onclick sur le bouton test qui va lancer toute nos actions pour le bon déroulement du jeu */
$("#test").click(function(){
    /* test si l'input n'est pas vide */
    if($("#input").val() == "")
    {
        /* si c'est vide alert et on stop la fonction */
        alert("Entrez une lettre!");
        return;
    }
    /* je stock ma lettre dans letter */
    var letter = $("#input").val();

    /* je stock dans un tableau pour mon affichage des lettres testés */
    tableauLettreTeste.push(letter);

    /* je vide mon input (ouai je suis sympas) */
    $("#input").val("");

    /* fais un jolie affichage des lettres testées */
    var wood = haJolieTest();

    /* j'affiche les lettres testées */
    $("#putted").html(wood);

    /* fonction qui renvoie vrai ou fonction si la lettre a été trouvé */
    var boul = testLetter(letter);
    if(!boul)
    {   
        printBaton();
        /* si on atteint 11 essaie = perdu! */
        if(cpt == 11)
        {
            //delay pour voir son etre pendu!
            alert("Désolé vous avez été pendu!");

            setTimeout(function(){
                popUpEndGame();
                alert("wait the game is reloading")
                setTimeout(function(){
                    document.location.reload(true);
                }, 3000);  
            }, 1000);
            

        }   
    }
    else
    {
        var word = dictionnaire[indexDictionnaire];
        var word2 = "";
        /* insertion dans une variable du mot dans un tableau */
        for(var i = 0; i < tableauWord.length; i++)
        {
            word2 += tableauWord[i].toLowerCase();
        }
        
        if(word == word2)
        {
            alert("Bravo! Vous avez trouvé le mot!");
            
             setTimeout(function(){
                popUpEndGame();
                alert("wait the game is reloading")
                setTimeout(function(){
                    document.location.reload(true);
                }, 3000);  
            }, 1000);
           
            
            
        
        }

    }

});

