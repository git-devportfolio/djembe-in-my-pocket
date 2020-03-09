
1er commit :
TODO : Charger les fichiers audio
1er squelette de l'application :
- Création des répertoires de travail
- Readme
- BaseController
- assets : Logos et fichiers audio

# DJEMBE IN MY POCKET

Toute la beauté et la magie des rythmes traditionnels d'Afrique reposent sur des structures rythmiques riches et parfois complexes à mémoriser. L'application **Djémbé in my Pocket** apporte une réponse simple pour retranscrire, mémoriser et partager ses rythmes djembé préférés. L'application permet de jouer les instruments simultanément (djembé, douns, djabara) ou individuellement afin de travailler plus facilement certaines parties.

Ce document décrit les fonctionnalités de l´application Djembé in my Pocket.

# L'application

## Les pages

| Page          | Description        | 
| :-------------| :------------------| 
| Login         | Se connecter  
| Register      | Créer un compte 
| PassForget    | Mot de passe oublié  
| Account       | L'utilisateur peut réinitialiser ou modifié son mot de passe  
| Admin         | Page de connexion   
| Home          | Route protégée, l'utilisateur doit être authentifié 
| Landing       | Route par défaut, l'utilisateur n'a pas besoin d'être authentifié 
| Rhythm        | Liste des rythme 
| Measure       | Liste des mesures d'un rythme
| Pattern       | Liste des patterns d'un rythme
| Event         | Liste des évènements d'un pattern

## Log

Chaque itinéraire représente une page de votre application. Par exemple, la page d'inscription doit être accessible en mode développement via http://localhost:3000/signup et en mode 
production via http://yourdomain/signup.

Tout d'abord, vous aurez une page d'inscription (**Signup**) et une page de connexion (**SignIn**). Vous pouvez prendre n'importe quelle application Web comme modèle 
pour structurer ces itinéraires pour une expérience d'authentification complète. 

Prenons le scénario suivant: un utilisateur visite cotre application Web, est convaincu par votre service et trouve le bouton dans la navigation de niveau supérieur pour se connecter à 
l'application. Mais l'utilisateur n'a pas encore de compte, donc un bouton d'inscription est présenté comme une alternative sur la page de connexion.

/copie d'écran image/

Deuxièmement, il y aura une page de destination(**Landing**) et une page d'accueil(**Home**). La page de destination est l'itinéraire par défaut (par exemple http://votredomaine /). 
C'est la page où un utilisateur se retrouve lors de la visite de votre application Web. L'utilisateur n'a pas besoin d'être authentifié pour suivre cette route. En revanche, 
la page d'accueil est un itinéraire protégé auquel les utilisateurs ne peuvent accéder que s'ils ont été authentifiés. Vous mettrez en œuvre la protection de la route en utilisant 
des mécanismes d'autorisation pour cette application.

Troisièmement, à côté de la page d'accueil, il y aura également une page de compte protégée et une page d'administration. Sur la page du compte, un utilisateur peut réinitialiser 
ou modifier un mot de passe. Il est également sécurisé par autorisation, il n'est donc accessible que pour les utilisateurs authentifiés. Sur la page d'administration, un utilisateur 
autorisé en tant qu'administrateur pourra gérer les utilisateurs de cette application. La page d'administration est protégée à un niveau plus fin, car elle n'est accessible qu'aux 
utilisateurs administrateurs authentifiés.

Enfin, le composant oublier le mot de passe sera exposé sur une autre page non protégée, une page oublier le mot de passe, aussi. Il est utilisé pour les utilisateurs qui ne sont pas 
authentifiés et ont oublié leur mot de passe.

L'utilisateur s'authentifie pour gérer ses rhythmes.  

est une progressive web app 
		* Fonctionnement OFF-LINE FIRST
		* RÉFÉRENCÉE SUR LES MOTEURS DE RECHERCHE
		* ACCÈS RESSOURCES SYSTÈME Notifications, GPS, Caméra, Calendrier
		* Installable sur ordinateur et application web
		* Mises à jour instantanées
		* Responsive
	- est réalisée avec le Framework OpenUI5
	- est hébergée sur GitHub [djembe-in-my-pocket](https://github.com/git-devportfolio/djembe-in-my-pocket)
	- utilise les services Worker (https://youtu.be/z_bwa1wMyT4)
		* [Service Worker UI5Con Youtube Video](https://tobiasso85.github.io/ui5con2019-service-worker-slides/#/)
		* [Service Worker Slides](https://tobiasso85.github.io/ui5con2019-service-worker-slides/#/)
		* [Asynchronify your App](https://blogs.sap.com/2018/04/26/ui5ers-buzz-29-asynchronify-your-app/)
		* [Best practices for async loading in UI5](https://blogs.sap.com/2018/12/18/ui5ers-buzz-41-best-practices-for-async-loading-in-ui5/)
		* [Modularization of the SAPUI5 Core](https://blogs.sap.com/2018/11/19/ui5ers-buzz-38-modularization-of-the-sapui5-core/)
		
## Les fontionnalités

### L'authentification

Il est nécessaire de se s'authentifier pour accéder aux fonctionnalités de l'application. L'authentification 
de l'utilsateur    
Authentification par email, gmail, appleID, facebook

### Gérer sa liste de rhythmes

Recherche un rythme par son nom
Rythmes ternaires, binaires
Ajouter/Modifier un rythme
Rythmes favoris
Taguer ses rythmes (à travailler)
Grouper/Trier ?

### Partage sesa liste de rhythmes

## Prérequis

- Coder avec OpenUI5, JavaScript ES5, ES6
- Suivre la méthode Test-Driven Development (TDD)
- Configurer la solution sur SAP WEB IDE 
- Configurer Grunt sur SAP WEB IDE
- Configurer le build sur SAP WEB IDE 
- Utiliser le thème sap_fiori_3 comme UI de base 
- Etendre le theme sap_fiori_3 avec l'outil SAP ([UI Theme Designer](https://openui5.hana.ondemand.com/#/tools))
- Investiguer sur l'outil [UI5 Tooling](https://openui5.hana.ondemand.com/#/tools)
- L'application doit être une réalisée en tant que [progressive web app](https://www.margecommunication.com/web/progressive-web-app/?gclid=Cj0KCQjwjrvpBRC0ARIsAFrFuV-r5j7LCtAnvIJWe0CHn7RJ6Yp1nm_nvPvE2u_Q7gyhZhzgF6P01bgaAtWOEALw_wcB)
- Workflow de développement (SAP Web IDE -> IPad -> GitHub -> Release -> Build -> Tests -> Livraison)
- Site Stikingly
- [Lien vers FireBase UI5](https://blogs.sap.com/2019/06/03/create-sapui5-applications-with-google-firebase/?source=social-global-sapdevs-twitter-audienceengagement-developers-unspecified-spr-2400448226&campaigncode=CRM-XB19-MKT-DGEALL)

## Les composants

L'application est découpé en composants :

* Authentification



* Liste des rythmes
* Liste des patterns
* Liste des évenements

## Les pages 

export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';
export const PASSWORD_FORGET = '/pw-forget';

	- Page de login / Logout (FireBase) : Composant réutilisable ?
	- Page liste des rhythmes (Filtre, partage...) : Composant réutilisable ?
	- Page modification propriétés du rythme : Composant réutilisable ?
	- Page liste des patterns d'un rythme : Composant réutilisable ?
	- Page liste des steps d'un pattern : Composant réutilisable ?
	
### Entités

### Les commentaires

/**
 * Constructor for a new <code>App</code>.
 *
 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
 * @param {object} [mSettings] Initial settings for the new control
 *
 * @class
 * The root element of a UI5 mobile app.
 *
 * <h3>Overview</h3>
 *
 * The <code>App</code> inherits from {@link sap.m.NavContainer} and thus provides its navigation capabilities.
 * It adds certain header tags to the HTML page which are considered useful for mobile apps.
 *
 * <h3>Usage</h3>
 *
 * You can configure the home icon of the <code>App</code>. For more information,
 * see the <code>homeIcon</code> property.
 *
 * There are options for setting the background color and a background image with the use of the
 * <code>backgroundColor</code> and <code>backgroundImage</code> properties.
 *
 * @see {@link topic:a4afb138acf64a61a038aa5b91a4f082 App}
 *
 * @extends sap.m.NavContainer
 *
 * @author SAP SE
 * @version ${version}
 *
 * @constructor
 * @public
 * @alias sap.m.App
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */

### Le build de PROD

dans /index.html remplacer le bootstrap de DEV par celui de PROD
data-sap-ui-async="false" => data-sap-ui-async="true" : Ceci permet d'afficher les sources aggrégés dans le dev tools de chrome
data-sap-ui-frameOptions="trusted" => data-sap-ui-async="allow" : Ceci permet d'éxecuter l'application dans la frame SAP Web IDE

### Les tests unitaires automatisés

#### QUnit

#### OPA5




