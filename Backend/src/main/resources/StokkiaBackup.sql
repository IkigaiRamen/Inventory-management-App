PGDMP      #            	    |            stokkia    16.4    16.4 5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    stokkia    DATABASE     �   CREATE DATABASE stokkia WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE stokkia;
                postgres    false            �            1259    17580 	   categorie    TABLE     �   CREATE TABLE public.categorie (
    id bigint NOT NULL,
    description character varying(255),
    libelle character varying(255)
);
    DROP TABLE public.categorie;
       public         heap    postgres    false            �            1259    17579    categorie_id_seq    SEQUENCE     �   ALTER TABLE public.categorie ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.categorie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    24620    clients    TABLE     8   CREATE TABLE public.clients (
    id bigint NOT NULL
);
    DROP TABLE public.clients;
       public         heap    postgres    false            �            1259    17593    commande    TABLE       CREATE TABLE public.commande (
    date_commande date,
    date_debut_commande date,
    date_fin_commande date,
    prix_commande numeric(38,2),
    prix_commandeht numeric(38,2),
    facture_id bigint,
    id bigint NOT NULL,
    personne_id bigint,
    reference_commande character varying(255),
    sens character varying(255),
    statut character varying(255),
    statut_commande character varying(255),
    type_commande character varying(255),
    CONSTRAINT commande_sens_check CHECK (((sens)::text = ANY ((ARRAY['DEBIT'::character varying, 'CREDIT'::character varying])::text[]))),
    CONSTRAINT commande_statut_commande_check CHECK (((statut_commande)::text = ANY ((ARRAY['START'::character varying, 'IN_PROGRESS'::character varying, 'VALIDATED'::character varying, 'COMPLETED'::character varying, 'CANCELLED'::character varying])::text[]))),
    CONSTRAINT commande_type_commande_check CHECK (((type_commande)::text = ANY ((ARRAY['PURCHASE'::character varying, 'SALE'::character varying, 'RENTAL'::character varying])::text[])))
);
    DROP TABLE public.commande;
       public         heap    postgres    false            �            1259    17592    commande_id_seq    SEQUENCE     �   ALTER TABLE public.commande ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.commande_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    17606    detail_commandes    TABLE     �   CREATE TABLE public.detail_commandes (
    prix_unitaire numeric(38,2),
    quantite integer NOT NULL,
    remise numeric(38,2),
    commande_id bigint,
    id bigint NOT NULL,
    produit_id bigint,
    commentaire character varying(255)
);
 $   DROP TABLE public.detail_commandes;
       public         heap    postgres    false            �            1259    17605    detail_commandes_id_seq    SEQUENCE     �   ALTER TABLE public.detail_commandes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.detail_commandes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    17612    facture    TABLE       CREATE TABLE public.facture (
    date_echeance date,
    date_emission date,
    id bigint NOT NULL,
    description character varying(255),
    mode_paiement character varying(255),
    numero_facture character varying(255),
    statut_paiement character varying(255)
);
    DROP TABLE public.facture;
       public         heap    postgres    false            �            1259    17611    facture_id_seq    SEQUENCE     �   ALTER TABLE public.facture ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.facture_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    24625    fournisseur    TABLE     <   CREATE TABLE public.fournisseur (
    id bigint NOT NULL
);
    DROP TABLE public.fournisseur;
       public         heap    postgres    false            �            1259    24631    personne    TABLE     x  CREATE TABLE public.personne (
    id bigint NOT NULL,
    date_nissance date,
    nom character varying(255),
    numero_carte_national character varying(255),
    prenom character varying(255),
    type character varying(255),
    CONSTRAINT personne_type_check CHECK (((type)::text = ANY ((ARRAY['CUSTOMER'::character varying, 'SUPPLIER'::character varying])::text[])))
);
    DROP TABLE public.personne;
       public         heap    postgres    false            �            1259    24630    personne_id_seq    SEQUENCE     �   ALTER TABLE public.personne ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.personne_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230            �            1259    17633    produit    TABLE     	  CREATE TABLE public.produit (
    quantite_disponible integer,
    quantite_totale integer,
    categorie_id bigint NOT NULL,
    id bigint NOT NULL,
    description character varying(255),
    imageurl character varying(255),
    libelle character varying(255)
);
    DROP TABLE public.produit;
       public         heap    postgres    false            �            1259    17632    produit_id_seq    SEQUENCE     �   ALTER TABLE public.produit ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.produit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    17641    utilisateur    TABLE       CREATE TABLE public.utilisateur (
    date_naissance timestamp(6) without time zone,
    id bigint NOT NULL,
    national_id bigint,
    adresse character varying(255),
    entreprise character varying(255),
    nom character varying(255),
    prenom character varying(255)
);
    DROP TABLE public.utilisateur;
       public         heap    postgres    false            �            1259    17640    utilisateur_id_seq    SEQUENCE     �   ALTER TABLE public.utilisateur ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.utilisateur_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �          0    17580 	   categorie 
   TABLE DATA           =   COPY public.categorie (id, description, libelle) FROM stdin;
    public          postgres    false    216   bC       �          0    24620    clients 
   TABLE DATA           %   COPY public.clients (id) FROM stdin;
    public          postgres    false    227   �C       �          0    17593    commande 
   TABLE DATA           �   COPY public.commande (date_commande, date_debut_commande, date_fin_commande, prix_commande, prix_commandeht, facture_id, id, personne_id, reference_commande, sens, statut, statut_commande, type_commande) FROM stdin;
    public          postgres    false    218   �C       �          0    17606    detail_commandes 
   TABLE DATA           u   COPY public.detail_commandes (prix_unitaire, quantite, remise, commande_id, id, produit_id, commentaire) FROM stdin;
    public          postgres    false    220   D       �          0    17612    facture 
   TABLE DATA           �   COPY public.facture (date_echeance, date_emission, id, description, mode_paiement, numero_facture, statut_paiement) FROM stdin;
    public          postgres    false    222   7D       �          0    24625    fournisseur 
   TABLE DATA           )   COPY public.fournisseur (id) FROM stdin;
    public          postgres    false    228   TD       �          0    24631    personne 
   TABLE DATA           _   COPY public.personne (id, date_nissance, nom, numero_carte_national, prenom, type) FROM stdin;
    public          postgres    false    230   wD       �          0    17633    produit 
   TABLE DATA           y   COPY public.produit (quantite_disponible, quantite_totale, categorie_id, id, description, imageurl, libelle) FROM stdin;
    public          postgres    false    224   E       �          0    17641    utilisateur 
   TABLE DATA           h   COPY public.utilisateur (date_naissance, id, national_id, adresse, entreprise, nom, prenom) FROM stdin;
    public          postgres    false    226   �E                  0    0    categorie_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categorie_id_seq', 5, true);
          public          postgres    false    215                       0    0    commande_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.commande_id_seq', 1, false);
          public          postgres    false    217                       0    0    detail_commandes_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.detail_commandes_id_seq', 1, false);
          public          postgres    false    219                       0    0    facture_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.facture_id_seq', 1, false);
          public          postgres    false    221                       0    0    personne_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.personne_id_seq', 8, true);
          public          postgres    false    229            	           0    0    produit_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.produit_id_seq', 9, true);
          public          postgres    false    223            
           0    0    utilisateur_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.utilisateur_id_seq', 1, false);
          public          postgres    false    225            E           2606    17586    categorie categorie_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT categorie_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categorie DROP CONSTRAINT categorie_pkey;
       public            postgres    false    216            S           2606    24624    clients clients_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public            postgres    false    227            G           2606    17604     commande commande_facture_id_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_facture_id_key UNIQUE (facture_id);
 J   ALTER TABLE ONLY public.commande DROP CONSTRAINT commande_facture_id_key;
       public            postgres    false    218            I           2606    17602    commande commande_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.commande DROP CONSTRAINT commande_pkey;
       public            postgres    false    218            K           2606    17610 &   detail_commandes detail_commandes_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.detail_commandes
    ADD CONSTRAINT detail_commandes_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.detail_commandes DROP CONSTRAINT detail_commandes_pkey;
       public            postgres    false    220            M           2606    17618    facture facture_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.facture DROP CONSTRAINT facture_pkey;
       public            postgres    false    222            U           2606    24629    fournisseur fournisseur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.fournisseur
    ADD CONSTRAINT fournisseur_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.fournisseur DROP CONSTRAINT fournisseur_pkey;
       public            postgres    false    228            W           2606    24638    personne personne_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.personne
    ADD CONSTRAINT personne_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.personne DROP CONSTRAINT personne_pkey;
       public            postgres    false    230            O           2606    17639    produit produit_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.produit
    ADD CONSTRAINT produit_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.produit DROP CONSTRAINT produit_pkey;
       public            postgres    false    224            Q           2606    17647    utilisateur utilisateur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_pkey;
       public            postgres    false    226            X           2606    24644 $   commande fk4h4xomya0b9qae0svd55f6ojm    FK CONSTRAINT     �   ALTER TABLE ONLY public.commande
    ADD CONSTRAINT fk4h4xomya0b9qae0svd55f6ojm FOREIGN KEY (personne_id) REFERENCES public.personne(id);
 N   ALTER TABLE ONLY public.commande DROP CONSTRAINT fk4h4xomya0b9qae0svd55f6ojm;
       public          postgres    false    4695    230    218            \           2606    17678 #   produit fk52xhp55kbbl6u4rbluxm3g9hw    FK CONSTRAINT     �   ALTER TABLE ONLY public.produit
    ADD CONSTRAINT fk52xhp55kbbl6u4rbluxm3g9hw FOREIGN KEY (categorie_id) REFERENCES public.categorie(id);
 M   ALTER TABLE ONLY public.produit DROP CONSTRAINT fk52xhp55kbbl6u4rbluxm3g9hw;
       public          postgres    false    216    224    4677            Z           2606    17668 ,   detail_commandes fk98so0dxmw1r4yoqsphftrb0ps    FK CONSTRAINT     �   ALTER TABLE ONLY public.detail_commandes
    ADD CONSTRAINT fk98so0dxmw1r4yoqsphftrb0ps FOREIGN KEY (produit_id) REFERENCES public.produit(id);
 V   ALTER TABLE ONLY public.detail_commandes DROP CONSTRAINT fk98so0dxmw1r4yoqsphftrb0ps;
       public          postgres    false    4687    220    224            ^           2606    24649 '   fournisseur fkds6jdxnfjlu0g2cib28r4g75n    FK CONSTRAINT     �   ALTER TABLE ONLY public.fournisseur
    ADD CONSTRAINT fkds6jdxnfjlu0g2cib28r4g75n FOREIGN KEY (id) REFERENCES public.personne(id);
 Q   ALTER TABLE ONLY public.fournisseur DROP CONSTRAINT fkds6jdxnfjlu0g2cib28r4g75n;
       public          postgres    false    228    4695    230            [           2606    17663 ,   detail_commandes fkeweesujykp87f07e13k10w959    FK CONSTRAINT     �   ALTER TABLE ONLY public.detail_commandes
    ADD CONSTRAINT fkeweesujykp87f07e13k10w959 FOREIGN KEY (commande_id) REFERENCES public.commande(id);
 V   ALTER TABLE ONLY public.detail_commandes DROP CONSTRAINT fkeweesujykp87f07e13k10w959;
       public          postgres    false    218    220    4681            ]           2606    24639 #   clients fkgnnqm180i13s61y7nyt884cc0    FK CONSTRAINT     �   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT fkgnnqm180i13s61y7nyt884cc0 FOREIGN KEY (id) REFERENCES public.personne(id);
 M   ALTER TABLE ONLY public.clients DROP CONSTRAINT fkgnnqm180i13s61y7nyt884cc0;
       public          postgres    false    230    227    4695            Y           2606    17653 $   commande fko35571d53e6npqs1nn0rb5x42    FK CONSTRAINT     �   ALTER TABLE ONLY public.commande
    ADD CONSTRAINT fko35571d53e6npqs1nn0rb5x42 FOREIGN KEY (facture_id) REFERENCES public.facture(id);
 N   ALTER TABLE ONLY public.commande DROP CONSTRAINT fko35571d53e6npqs1nn0rb5x42;
       public          postgres    false    218    222    4685            �   d   x�-��	�@��*�A�L�LM��!x�]��SQx���kiΩ�C9$cG�/(w�>#}�{��J6I���:���	?�@D����WÖ����0�7�%�      �      x�3�2�2�2������� �      �      x������ � �      �      x������ � �      �      x������ � �      �      x�3�2�2����� 	a      �   �   x��ϱ!๼�(��s0�x��9���\�4t�o���!֌�聅b^J���R���z9?7j<A�#@�up�+�s���~+�vm(ŜrL�?)�NѨ�S����A~��Qk�e��m�����ǽãq�5�ݾJ�@�Z�      �   �   x���A� ��~umk��ҹSě�4��|����:E������D�i�.���8�gB¡o�F�	F��
S��8�:^*@��V#�̳��_�"۪��+�Mh=������0�z��ۼ����tfO���d�>_8��n�T�      �      x������ � �     