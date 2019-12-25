/* tableau qui va stocker tout nos mot pour le jeu */
var dictionnaire = 
[
    "abaissante",
    "roronoa",
    "abalones",
    "zygene",
    "zygopteres",
    "zygospore",
    "zodiaque",
    "xenobiotique",
    "xenophile",
    "wisigothique",
    "vuvuzela",
    "vulvites",
    "voussoyassent",
    "nez",
    "riz",
    "pli",
    "cri",
    "poil",
    "heineken",
    "onepiece"
];

/* variable qui va compterle nombre d'erreur */
var cpt = 0;

/* variable qui va stocker l'index du tableau dictionnaire pour garder le mot à trouver */
var indexDictionnaire;

/* tableau qui va stocker toute les lettres entrées par le joueur */
var tableauLettreTeste = [];


/* final word */
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
        alert("Cette lettre n'est pas dans le mot");
        printBaton();
        /* si on atteint 11 essaie = perdu! */
        if(cpt == 11)
        {
            //delay pour voir son etre pendu!
            setTimeout(function(){
                alert("Désolé vous avez été pendu!");
                popUpEndGame();
                resetAll();
            }, 2000);

        }   
    }
    else
    {
        var word = dictionnaire[indexDictionnaire];
        var word2 = "";
        /* insertion dans une variable du mot dans un tableau */
        for(var i = 0; i < tableauWord.length; i++)
        {
            word2 += tableauWord[i];
        }
        
        if(word == word2)
        {
            setTimeout(function(){
                alert("Bravo! Vous avez trouvé le mot!");
                popUpEndGame();
            }, 500);

            setTimeout(function(){
                document.location.reload(true);
            }, 3000);
            
        
        }

    }

});

function printBaton()
{
    switch(cpt)
    {
        case 0  : 
            changeStickOne(true);
            cpt++;
            break;
        case 1 : 
            changeStickTwo(true);
            cpt++;
            break;
        case 2:
            changeStickThree(true);
            cpt++;
            break;
        case 3:
            changeStickFour(true);
            cpt++;
            break;
        case 4:
            changeStickFive(true);
            cpt++;
            break;
        case 5:
            changeStickSix(true);
            cpt++;
            break;
        case 6:
            changeStickSeven(true);
            cpt++;
            break;
        case 7:
            changeStickEight(true);
            cpt++;
            break;
        case 8:
            changeStickNine(true);
            cpt++;
            break;
        case 9:
            changeStickTen(true);
            cpt++;
            break;
        case 10:
            changeStickEleven(true);
            cpt++;
            break;
        
    }
}

/* fonction fais un jolie affichage des lettres testées */
function haJolieTest()
{
    var word = "";
    for(var i = 0; i < tableauLettreTeste.length; i++)
    {
        word += tableauLettreTeste[i]
        word += ",";
    }
    return word;
}


/* fonction qui va tester la lettre entrée */
function testLetter(lettre)
{
    /* je stock le mot à trouver dans word */
    var word = dictionnaire[indexDictionnaire];
    /* jinit un booléan pour tchecker les erreur */
    var bool = false;
    /* je boucle mon mot */
    for ( var i = 0; i < word.length; i++)
    {
        /* je test si word d'indice i égale la lettre entrée */
        if(lettre == word[i])
        {
            /* jinit bool à vrai pour dire que le joueur à trouvé une lettre du mot */
            bool = true;
            /* je lance ma fonction pour changer l'interface du mot à trouver */
            putLetter(lettre);
        }
    }
    return bool;
}

function putLetter(lettre)
{
    var wordToFind = dictionnaire[indexDictionnaire];
    /* newTab est un tableau qui se réinitialise à chaque appel de la fonction */
    var newTab = [];

    /* bouclea chaque lettre du mot */
    for(var i = 0; i < wordToFind.length; i++)
    {
        /* si la lettre entrer équivaut à la lettre de position i du mot à trouver */
        if(wordToFind[i] == lettre)
        {
            /* je stock la lettre dans mon tableau */
            newTab.push(lettre);
        }
        else
        {
            /* sinon je laisse le _ */
            newTab.push("_ ");
        }
    }

/* Si c'est la 1er lettre entrer alors flag est sur true pour éviter d'avoir un tableauWord vide pour notre else */
    if(flag)
    {
        /* copie le tableau newTab dans tableauWord */
        for(var i = 0; i< newTab.length; i++)
        {
            tableauWord[i] = newTab[i];            
        }
        flag = false;
    }
    else
    {
        /* boucle le tableau newTab pour récupérer les nouvelles lettres justes */
        for(var i = 0; i< newTab.length; i++)
        {
            /* si tableauWord d'indice i est égale à _ la change pour avoir une nouvelle lettre trouvée */
            if(tableauWord[i] == "_ ")
            {
                tableauWord[i] = newTab[i];
            }
                        
        }

    }
    /* j'envoie dans mon html le mot avec les lettres trouvées + _ s'il en reste */
    $("#under").html(tableauWord);

}

/* fonction pour initialiser la partie */
function initGame()
{
    resetAll();
    $("#try").show();
    $("#status").show();
    $("#print").show();
    $("#gameOver").hide();
    tableauWord = [];
    tableauLettreTeste = [];
    var max = dictionnaire.length - 1;
    indexDictionnaire = getRandomNumber(0, max); 
    console.log(dictionnaire[indexDictionnaire]); 
    initUnderScores(indexDictionnaire);
}
/* fin fonction pour initialiser la partie */

/* fonction pour choisir un mot au hasard dans notre tableau */
function getRandomNumber(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*fin fonction pour choisir un mot au hasard dans notre tableau */

/*fonction pour initialiser les _ dans notres html pour le mot à trouver */
function initUnderScores(index)
{
    var wordToFind = dictionnaire[index];
    var placement = "";

    for(var i = 0; i < wordToFind.length; i++)
    {
        placement += "_  ";
    }

    $("#under").html(placement);
}

/*fin fonction pour initialiser les _ dans notres html pour le mot à trouver */

/* fonction pour la fin de partie */
function popUpEndGame()
{
    $("#try").hide();
    $("#status").hide();
    $("#print").hide();
    changeStickOne(false);
    changeStickTwo(false);
    changeStickThree(false);
    changeStickFour(false);
    changeStickFive(false);
    changeStickSix(false);
    changeStickSeven(false);
    changeStickEight(false);
    changeStickNine(false);
    changeStickTen(false);
    changeStickEleven(false);
    $("#gameOver").show();

}
/*fin fonction pour la fin de partie */

/* fonction pour reset tout les champs du html */
function resetAll()
{
    $("#under").html("");
    $("#putted").html("");
    changeStickOne(false);
    changeStickTwo(false);
    changeStickThree(false);
    changeStickFour(false);
    changeStickFive(false);
    changeStickSix(false);
    changeStickSeven(false);
    changeStickEight(false);
    changeStickNine(false);
    changeStickTen(false);
    changeStickEleven(false);

}
/*fin fonction pour reset tout les champs du html */

/* hide/show baton du pendu */

function  changeStickOne(bool)
{
    bool ? $("#one").show() : $("#one").hide(); 
}

function  changeStickTwo(bool)
{
    bool ? $("#two").show() : $("#two").hide(); 
}

function  changeStickThree(bool)
{
    bool ? $("#three").show() : $("#three").hide(); 
}

function  changeStickFour(bool)
{
    bool ? $("#four").show() : $("#four").hide(); 
}

function  changeStickFive(bool)
{
    bool ? $("#five").show() : $("#five").hide(); 
}

function  changeStickSix(bool)
{
    bool ? $("#six").show() : $("#six").hide(); 
}

function  changeStickSeven(bool)
{
    bool ? $("#seven").show() : $("#seven").hide(); 
}

function  changeStickEight(bool)
{
    bool ? $("#eight").show() : $("#eight").hide(); 
}

function  changeStickNine(bool)
{
    bool ? $("#nine").show() : $("#nine").hide(); 
}

function  changeStickTen(bool)
{
    bool ? $("#ten").show() : $("#ten").hide(); 
}

function  changeStickEleven(bool)
{
    bool ? $("#eleven").show() : $("#eleven").hide(); 
}