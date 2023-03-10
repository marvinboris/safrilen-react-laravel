<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $publications = [
            [
                'title' => json_encode([
                    'fr' => "Groupe électrogène",
                    'en' => "Generator",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur les groupes électrogènes",
                    'en' => "What you need to know about generators",
                ]),
                'body' => json_encode([
                    'fr' => "Un groupe électrogène est un dispositif autonome capable de produire de l'électricité.<br />  
                    <br />
                    La plupart des groupes sont constitués d'un moteur thermique qui actionne un alternateur. Leur taille et leur poids peuvent varier de quelques kilogrammes à plusieurs dizaines de tonnes. <br />
                    <br />
                    Des modèles de groupes électrogènes existent en triphasé. Le groupe électrogène peut être fixe ou mobile. <br />
                    <br />
                    Cet appareil a pour énergie de substitution le carburant car il a besoin de produire sa propre électricité en autonomie, celle-ci provenant d’un alternateur ou d’une génératrice. <br />
                    Dans les lieux importants comme les hôpitaux, les bases militaires, les aéroports… qui ne peuvent pas se permettre d’être en panne de courant, des modèles fixes de groupe électrogène sont présents.<br /> ",
                    'en' => "A generator is a self-contained device capable of producing electricity.<br />
                    <br />
                    Most generators are made up of a heat engine that powers an alternator. Their size and weight can vary from a few kilograms to several tens of tons. <br />
                    <br />
                    Models of generating sets exist in three-phase. The generating set can be fixed or mobile. <br />
                    <br />
                    This device uses fuel as a substitute energy because it needs to produce its own electricity independently, coming from an alternator or a generator. <br />
                    In important places such as hospitals, military bases, airports... which cannot afford to be out of power, fixed models of generator sets are present.<br />",
                ]),
                'photo' => "FAQ_36_1-1339x1080.webp"
            ],
            [
                'title' => json_encode([
                    'fr' => "Onduleurs solaires",
                    'en' => "Solar inverters",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur les onduleurs solaires.",
                    'en' => "What you need to know about solar inverters.",
                ]),
                'body' => json_encode([
                    'fr' => "Un <strong>onduleur solaire</strong> est un onduleur convertissant le courant continu de l'énergie photovoltaïque issue d'un panneau solaire en courant alternatif.<br /> 
                    Bien choisir son onduleur solaire est essentiel, car il a un impact sur la production d’électricité des panneaux solaires et leur performance. <br />
                    L’onduleur solaire fonctionne de manière permanente une fois qu’il a été installé et programmé. Il fait partie de l’installation en complément des panneaux solaire et permet d’intégrer des batteries de stockage de votre production électrique.<br /> 
                    L’onduleur a pour but d’optimiser la production d’électricité d’un panneau solaire. Pour cela, il analyse en permanence le courant continu émis par les panneaux photovoltaïques, car celui-ci change continuellement en fonction de différents facteurs, comme l’ensoleillement par exemple.<br />  
                    Il convertit cette énergie puis la transforme en courant domestique afin d’alimenter le réseau et les appareils électriques. <br />
                    Il est également équipé d’un microprocesseur qui permet de s’assurer que le courant électrique produit respecte bien les normes imposées par le gestionnaire du réseau.<br /> 
                    <br />
                    <span class='text-lg font-bold'>Les différents types d’onduleurs pour panneaux solaires</span>
                    <ul class='list-disc pl-4 space-y-3 mt-4'>
                    <li>Le <strong>micro-onduleur</strong> <br />Aussi appelé onduleur module, il s’agit de l’onduleur solaire qui est le plus souvent mis en place et utilisé pour les logements particuliers. De petite taille, il s’installe directement derrière chaque panneau solaire pour transformer l’électricité continue en courant alternatif. Chaque panneau a donc son propre onduleur et est indépendant, ce qui permet une production optimale même en cas de panne, et par conséquent une plus grande évolutivité du parc solaire.</li>
                    <li>L’<strong>onduleur de chaîne</strong> <br />Ce type d’onduleur solaire recueille et transforme l’électricité fournie par plusieurs panneaux solaires en même temps. Plus puissant, il permet de n’avoir qu’un seul onduleur qui gère plusieurs panneaux photovoltaïques, ce qui simplifie l’installation et l’entretien.</li>
                    <li>L’<strong>onduleur central</strong> <br />Comme l’onduleur de chaîne, il se branche au bout d’une série de panneaux photovoltaïques. Il est cependant plus imposant et peut gérer plusieurs chaînes de panneaux. On privilégie son installation lorsque le parc de panneaux solaires commence à être important. Il prend la forme d’une armoire installée au sol. Il est particulièrement adapté pour les locaux professionnels et industriels.</li>
                    <li>L’<strong>onduleur à batterie</strong><br />Certains modèles d’onduleur solaire intègrent une batterie de stockage. Ils gardent l’excédent d’électricité pour l’utiliser lorsque ce sera nécessaire.</li> 
                    <li>L’<strong>onduleur hybride</strong> <br />
                    La dernière génération d’onduleur, appelée « hybride », est intelligente. Selon le paramétrage, il est capable de déterminer lui-même si l’électricité produite doit être utilisée immédiatement, stockée dans une batterie, ou injectée dans le réseau. Le boîtier peut être connecté au groupe électrogène afin d’assurer une alimentation de secours en cas de coupure de courant.<br /> 
                    De la même façon, l’onduleur hybride est capable de gérer les différentes sources d’énergie afin de déterminer quel type d’électricité utiliser à quel moment. Il est donc capable de choisir lui-même entre utiliser le réseau public de distribution d’électricité, la consommation directe de la production provenant des panneaux solaires ou bien l’électricité stockée dans des batteries.<br /> 
                    Les onduleurs solaires hybrides sont très intéressants à mettre en place, car ils permettent de gérer le plus intelligemment possible la production et la consommation. Il est alors plus facile de rentabiliser son installation solaire.</li> 
                    </ul>",
                    'en' => "A <strong>solar inverter</strong> is an inverter that converts the direct current of photovoltaic energy from a solar panel into alternating current.<br />
                    Choosing the right solar inverter is essential, because it has an impact on the electricity production of solar panels and their performance. <br />
                    The solar inverter works permanently once it has been installed and programmed. It is part of the installation in addition to the solar panels and allows you to integrate storage batteries for your electricity production.<br />
                    The purpose of the inverter is to optimize the production of electricity from a solar panel. To do this, it continuously analyzes the direct current emitted by the photovoltaic panels, as this continuously changes depending on various factors, such as sunshine for example.<br />
                    It converts this energy and then transforms it into household current to power the network and electrical appliances. <br />
                    It is also equipped with a microprocessor which ensures that the electric current produced complies with the standards imposed by the network manager.<br />
                    <br />
                    <span class='text-lg font-bold'>The different types of inverters for solar panels</span>
                    <ul class='list-disc pl-4 space-y-3 mt-4'>
                    <li>The <strong>micro-inverter</strong> <br />Also called module inverter, this is the solar inverter that is most often set up and used for private homes. Small in size, it is installed directly behind each solar panel to transform direct electricity into alternating current. Each panel therefore has its own inverter and is independent, which allows optimal production even in the event of a breakdown, and therefore greater scalability of the solar park.</li>
                    <li>The <strong>String Inverter</strong> <br />This type of solar inverter collects and transforms the electricity supplied by several solar panels at the same time. More powerful, it allows to have only one inverter that manages several photovoltaic panels, which simplifies installation and maintenance.</li>
                    <li>The <strong>central inverter</strong> <br />Like the string inverter, it is connected at the end of a series of photovoltaic panels. It is, however, more imposing and can manage several chains of panels. Its installation is preferred when the solar panel fleet begins to be important. It takes the form of a cabinet installed on the floor. It is particularly suitable for professional and industrial premises.</li>
                    <li>The<strong>battery-powered inverter</strong><br />Some solar inverter models incorporate a storage battery. They store excess electricity for use when needed.</li>
                    <li>The <strong>hybrid inverter</strong> <br />
                    The latest generation of inverter, called \"hybrid\", is intelligent. Depending on the settings, it is able to determine itself whether the electricity produced should be used immediately, stored in a battery, or injected into the network. The box can be connected to the generator to provide backup power in the event of a power cut.<br />
                    In the same way, the hybrid inverter is able to manage the different energy sources in order to determine which type of electricity to use at which time. He is therefore able to choose for himself between using the public electricity distribution network, direct consumption of production from solar panels or electricity stored in batteries.<br />
                    Hybrid solar inverters are very interesting to set up, because they make it possible to manage production and consumption as intelligently as possible. It is then easier to make your solar installation profitable.</li>
                    </ul>",
                ]),
                'photo' => "H6d85000be8f941afab4b30e395068baaL.webp"
            ],
            [
                'title' => json_encode([
                    'fr' => "Onduleurs électriques",
                    'en' => "Electric inverters",
                ]),
                'description' => json_encode([
                    'fr' => "Ce qu'il faut savoir sur les onduleurs électriques.",
                    'en' => "What you need to know about power inverters.",
                ]),
                'body' => json_encode([
                    'fr' => "Un onduleur est un dispositif électronique de puissance permettant de générer des tensions et des courants alternatifs à partir d'une source d'énergie électrique continue. Il est indispensable pour protéger vos appareils contre les risques électriques comme les coupures de courant, les surtensions, les sous-tensions, sert principalement à pallier aux coupures de courant, mais ce n’est pas tout. <br />
                    <br /> 
                    Dès que l'onduleur détecte une coupure soudaine d'électricité, ses batteries prennent automatiquement le relais et alimentent vos équipements pendant une durée correspondante à l’autonomie. <br />
                    <br />
                    Dans un premier temps, en cas de coupure de courant, les batteries de l’onduleur vont fournir l’énergie à vos appareils pendant quelque temps. L’autonomie varie en fonction de la capacité des batteries et de la puissance nécessaire. Il prend le relais quand il y a une coupure de courant. <br />
                    Dans un second temps, il faut considérer ses apports continus. <br /><br />
                    <span class='text-lg font-bold'>Fonctions principales de l’onduleur</span>
                    <ul class='list-disc pl-4 mt-4'>
                    <li>Prendre le relais du secteur en cas de coupures du courant</li> 
                    <li>Assurer la continuité de la fourniture d'électricité jusqu'aux appareils si la panne de courant persiste,</li> 
                    <li>Protéger les différentes machines, telles que les appareils industriels, les périphériques informatiques (imprimante, unité centrale, etc.) ou encore les ordinateurs, en cas de coupure répétée d'électricité,</li> 
                    <li>Assurer la protection des mêmes dispositifs énumérés précédemment contre la foudre, les micro-coupures, les parasites électriques ainsi que les variations de tension, </li>
                    <li>Filtrer et réguler la tension électrique pour que les appareils informatiques ne s'endommagent pas.</li>
                    </ul>
                    ",
                    'en' => "An inverter is a power electronic device for generating alternating voltages and currents from a source of direct electrical energy. It is essential to protect your devices against electrical risks such as power cuts, overvoltages, undervoltages, mainly serves to compensate for power cuts, but that's not all. <br />
                    <br />
                    As soon as the UPS detects a sudden power cut, its batteries automatically take over and supply your equipment for a period corresponding to the autonomy. <br />
                    <br />
                    Initially, in the event of a power outage, the batteries of the inverter will supply energy to your devices for some time. The autonomy varies according to the capacity of the batteries and the power required. It takes over when there is a power outage. <br />
                    In a second step, we must consider its continuous contributions. <br /><br />
                    <span class='text-lg font-bold'>Main Inverter Functions</span>
                    <ul class='list-disc pl-4 mt-4'>
                    <li>Take over from the mains in the event of power outages</li>
                    <li>Ensure the continuity of the electricity supply to the devices if the power failure persists,</li>
                    <li>Protect the various machines, such as industrial devices, computer peripherals (printer, central unit, etc.) or even computers, in the event of repeated power cuts,</li>
                    <li>Ensure the protection of the same devices listed above against lightning, micro-cuts, electrical noise and voltage variations, </li>
                    <li>Filtering and regulating electrical voltage so that computing devices are not damaged.</li>
                    </ul>",
                ]),
                'photo' => "show_Riello_UPS_Master-MPS_range-removebg-preview.png"
            ],
        ];

        foreach ($publications as $publication) {
            User::whereId(2)->first()->publications()->create($publication);
        }
    }
}
