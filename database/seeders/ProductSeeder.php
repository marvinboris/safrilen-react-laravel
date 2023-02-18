<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'name' => json_encode([
                    'fr' => 'Onduleurs électriques',
                    'en' => 'Electric inverters',
                ]),
                'description' => json_encode([
                    'fr' => "Un <strong>onduleur</strong> est un dispositif électronique de puissance permettant de générer des tensions et des courants alternatifs à partir d'une source d'énergie électrique continue. Il est indispensable pour protéger vos appareils contre les risques électriques comme les coupures de courant, les surtensions, les sous-tensions et sert principalement à pallier aux coupures de courant, mais ce n’est pas tout. <br />
                    <br /> 
                    Dès que l'onduleur détecte une coupure soudaine d'électricité, ses batteries prennent automatiquement le relais et alimentent vos équipements pendant une durée correspondante à l’autonomie. <br />
                    <br />
                    Les batteries de l’onduleur vont fournir l’énergie à vos appareils. L’autonomie varie en fonction de la capacité des batteries et de la puissance nécessaire.",
                    'en' => 'An <strong>inverter</strong> is a power electronic device that generates alternating voltages and currents from a direct electrical energy source. It is essential to protect your devices against electrical risks such as power cuts, overvoltages, undervoltages and is mainly used to compensate for power cuts, but that\'s not all. <br />
                    <br />
                    As soon as the UPS detects a sudden power cut, its batteries automatically take over and supply your equipment for a period corresponding to the autonomy. <br />
                    <br />
                    The UPS batteries will provide power to your devices. The autonomy varies according to the capacity of the batteries and the power required.',
                ]),
                'price' => 20000,
                'photo' => '7.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Onduleurs solaires',
                    'en' => 'Solar inverters',
                ]),
                'description' => json_encode([
                    'fr' => "Un <strong>onduleur solaire</strong> est un onduleur convertissant le courant continu de l'énergie photovoltaïque issue d'un panneau solaire en courant alternatif.<br /> 
                    Bien choisir son onduleur solaire est essentiel, car il a un impact sur la production d’électricité des panneaux solaires et leur performance. <br />
                    L’onduleur solaire fonctionne de manière permanente une fois qu’il a été installé et programmé. Il fait partie de l’installation en complément des panneaux solaire et permet d’intégrer des batteries de stockage de votre production électrique.<br /> 
                    L’onduleur a pour but d’optimiser la production d’électricité d’un panneau solaire. Pour cela, il analyse en permanence le courant continu émis par les panneaux photovoltaïques, car celui-ci change continuellement en fonction de différents facteurs, comme l’ensoleillement par exemple.<br />  
                    Il convertit cette énergie puis la transforme en courant domestique afin d’alimenter le réseau et les appareils électriques. <br />
                    Il est également équipé d’un microprocesseur qui permet de s’assurer que le courant électrique produit respecte bien les normes imposées par le gestionnaire du réseau.",
                    'en' => "A <strong>solar inverter</strong> is an inverter that converts the direct current of photovoltaic energy from a solar panel into alternating current.<br />
                    Choosing the right solar inverter is essential, because it has an impact on the electricity production of solar panels and their performance. <br />
                    The solar inverter works permanently once it has been installed and programmed. It is part of the installation in addition to the solar panels and allows you to integrate storage batteries for your electricity production.<br />
                    The purpose of the inverter is to optimize the production of electricity from a solar panel. To do this, it continuously analyzes the direct current emitted by the photovoltaic panels, as this continuously changes depending on various factors, such as sunshine for example.<br />
                    It converts this energy and then transforms it into household current to power the network and electrical appliances. <br />
                    It is also equipped with a microprocessor which ensures that the electric current produced complies with the standards imposed by the network manager.",
                ]),
                'price' => 100000,
                'photo' => '8.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Groupes électrogènes',
                    'en' => 'Generators',
                ]),
                'description' => json_encode([
                    'fr' => "Un <strong>groupe électrogène</strong> est un dispositif autonome capable de produire de l'électricité.<br />  
                    <br />
                    La plupart des groupes sont constitués d'un moteur thermique qui actionne un alternateur. Leur taille et leur poids peuvent varier de quelques kilogrammes à plusieurs dizaines de tonnes. <br />
                    <br />
                    Des modèles de groupes électrogènes existent en triphasé. Le groupe électrogène peut être fixe ou mobile. <br />
                    <br />
                    Cet appareil a pour énergie de substitution le carburant car il a besoin de produire sa propre électricité en autonomie, celle-ci provenant d’un alternateur ou d’une génératrice. <br />
                    Dans les lieux importants comme les hôpitaux, les bases militaires, les aéroports… qui ne peuvent pas se permettre d’être en panne de courant, des modèles fixes de groupe électrogène sont présents.",
                    'en' => "A <strong>generator</strong> is a self-contained device capable of producing electricity.<br />
                    <br />
                    Most generators are made up of a heat engine that powers an alternator. Their size and weight can vary from a few kilograms to several tens of tons. <br />
                    <br />
                    Models of generating sets exist in three-phase. The generating set can be fixed or mobile. <br />
                    <br />
                    This device uses fuel as a substitute energy because it needs to produce its own electricity independently, coming from an alternator or a generator. <br />
                    In important places such as hospitals, military bases, airports... which cannot afford to be out of power, fixed models of generators are present.",
                ]),
                'price' => 5000000,
                'photo' => 'Grupo-electrogeno-Dagartech_Industrial-insonorizado-grande_CTA.png'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Équipements de protection individuelle',
                    'en' => 'Personal protective equipment',
                ]),
                'description' => json_encode([
                    'fr' => "Un équipement de protection individuelle (EPI) est un dispositif ou moyen destiné à être porté ou tenu par une personne en vue de la protéger cotre un ou plusieurs risques susceptibles de menacer sa sécurité anisi que sa santé principalement au travail.<br /><br />
                    Les obligations de l'employeur en matière d'équipements de protection individuelle, ainsi que les règles définies dans le Code du Travail. L'employeur doit rechercher tous les moyens permettant d'assurer la sécurité de ses salariés en :<br />
                    <ul class='list-disc pl-4 mt-4'>
                    <li>Supprimant ou réduisant les risques à la source</li>
                    <li>Mettant en place des mesures de protection collective</li>
                    <li>Donnant des consignes appropriées aux salariés</li>
                    </ul>",
                    'en' => "Personal protective equipment (PPE) is a device or means intended to be worn or held by a person in order to protect him against one or more risks likely to threaten his safety and his health mainly at work.<br /><br />
                    The obligations of the employer in terms of personal protective equipment, as well as the rules defined in the Labor Code. The employer must seek all means to ensure the safety of its employees by:<br />
                    <ul class='list-disc pl-4 mt-4'>
                    <li>Removing or reducing risks at source</li>
                    <li>Implementing collective protection measures</li>
                    <li>Giving appropriate instructions to employees</li>
                    </ul>",
                ]),
                'price' => 30000,
                'photo' => '6.png'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
