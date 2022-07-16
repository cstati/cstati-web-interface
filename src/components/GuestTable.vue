<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1 pt-2"
        :loading="loading"
        loading-text="Загрузка.."
        :items-per-page="15"
        :search="search"
    >

      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Таблица гостей</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              class="mt-5"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="650px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  icon
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.tgId"
                          label="Id"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.name"
                          label="Имя"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.phone"
                          label="Номер телефона"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.sex"
                          label="Пол"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-select
                          :items="[1, 2, 3]"
                          v-model="editedItem.room_type"
                          label="Тип билета"
                      ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-checkbox
                        v-model="editedItem.payment"
                        label="Факт оплаты"
                      >
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Отменить
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Вы уверены, что хотите удалить этот <br> объект?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Отменить</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Удалить</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>

      <template v-slot:item.payment="{ item }">
        <v-simple-checkbox
            v-model="item.payment"
            :ripple="false"
            v-on:input="updateItem(item)"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.room_type="{ item }">
        {{ getPrice(item.room_type) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </div>
</template>

<script>
const COLORS = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
}
const ICONS = {
  info: 'mdi-information',
  warning: 'mdi-alert',
  error: 'mdi-alert-circle',
  success: 'mdi-check-circle',
}

export default {
  data () {
    return {
      items: [],
      search: '',
      loading: true,
      headers: [
        { text: 'Id', value: 'tgId', align: 'start', width: "20%"},
        { text: 'Имя', value: 'name', width: "20%"},
        { text: 'Номер телефона', value: 'phone' },
        { text: 'Пол', value: 'sex' },
        { text: 'Цена билета', value: 'room_type' },
        { text: 'Факт оплаты', value: 'payment' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      dialogDelete: false,
      dialog: false,
      editedItem: {
        tgId: 0,
        name: '',
        phone: '',
        room_type: 0,
        sex: '',
        payment: false
      },
      defaultItem: {
        tgId: 0,
        name: '',
        phone: '',
        room_type: 0,
        sex: '',
        payment: false
      }
    }
  },
  mounted() {
    setTimeout(()=> {
      this.items = [
        {
          tgId: 33788,
          name: "Conrad Aquila Beck",
          phone: "+7 (886) 579-53-92",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 25050,
          name: "Knowles Allegra May",
          phone: "+7 (518) 715-46-54",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 59774,
          name: "Elaine Merrill",
          phone: "+7 (539) 277-77-42",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 36593,
          name: "Kevin Blankenship",
          phone: "+7 (862) 854-65-23",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 24560,
          name: "Reece Roberson",
          phone: "+7 (647) 571-43-21",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 74160,
          name: "Bowers Nichole Beatrice",
          phone: "+7 (645) 632-64-93",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 58134,
          name: "Alvin Montgomery",
          phone: "+7 (761) 846-07-22",
          room_type: 3,
          sex: "М",
          payment: true
        },
        {
          tgId: 59329,
          name: "Rasmussen Kato Nissim",
          phone: "+7 (557) 837-04-22",
          room_type: 3,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 67100,
          name: "Ann Dixon",
          phone: "+7 (542) 103-46-29",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 65623,
          name: "Martin Basil Avram",
          phone: "+7 (125) 156-61-18",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 55052,
          name: "Chelsea Salas",
          phone: "+7 (677) 121-82-76",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 11152,
          name: "Fletcher Barker",
          phone: "+7 (754) 105-58-83",
          room_type: 3,
          sex: "М",
          payment: true
        },
        {
          tgId: 41590,
          name: "Phillips Sydnee Helen",
          phone: "+7 (383) 955-71-38",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 20519,
          name: "Trevor Estrada",
          phone: "+7 (654) 230-42-13",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 86382,
          name: "Drake Kalia Kieran",
          phone: "+7 (763) 418-86-92",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 29001,
          name: "Rafael Shaffer",
          phone: "+7 (885) 778-41-10",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 95389,
          name: "Victor Collins",
          phone: "+7 (363) 626-21-00",
          room_type: 1,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 99175,
          name: "Fritz Howe",
          phone: "+7 (141) 511-16-43",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 99302,
          name: "Johns Maile Serena",
          phone: "+7 (847) 855-89-26",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 81217,
          name: "Jeanette Bender",
          phone: "+7 (644) 972-89-30",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 10023,
          name: "Woodard Lawrence Griffin",
          phone: "+7 (663) 809-88-78",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 23826,
          name: "Franks George Urielle",
          phone: "+7 (371) 503-88-17",
          room_type: 1,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 82806,
          name: "Marny Ayala",
          phone: "+7 (447) 732-53-39",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 83302,
          name: "Avila Harrison Heidi",
          phone: "+7 (849) 744-01-39",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 18662,
          name: "Larson Skyler Dane",
          phone: "+7 (923) 426-41-52",
          room_type: 3,
          sex: "М",
          payment: false
        },
        {
          tgId: 27942,
          name: "Quynn Padilla",
          phone: "+7 (405) 726-45-19",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 98982,
          name: "Deborah Rogers",
          phone: "+7 (121) 659-78-76",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 97924,
          name: "Jenkins Aiko Hayes",
          phone: "+7 (589) 636-33-26",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 91022,
          name: "Trevino Hamish Armando",
          phone: "+7 (044) 379-02-12",
          room_type: 1,
          sex: "М",
          payment: true
        },
        {
          tgId: 30121,
          name: "Oliver Macias",
          phone: "+7 (523) 740-51-61",
          room_type: 3,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 67903,
          name: "Sasha Marshall",
          phone: "+7 (069) 667-94-41",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 40028,
          name: "Marah Wade",
          phone: "+7 (848) 537-76-01",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 29243,
          name: "Fredericka Crosby",
          phone: "+7 (887) 761-96-82",
          room_type: 3,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 55777,
          name: "Elton Mejia",
          phone: "+7 (254) 415-43-12",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 19280,
          name: "Amanda Bird",
          phone: "+7 (775) 704-52-68",
          room_type: 1,
          sex: "М",
          payment: true
        },
        {
          tgId: 80719,
          name: "Ebony Harvey",
          phone: "+7 (381) 673-93-47",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 65614,
          name: "Hayes Sexton",
          phone: "+7 (927) 871-65-65",
          room_type: 1,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 47154,
          name: "Olivia Sweet",
          phone: "+7 (367) 623-91-47",
          room_type: 1,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 82421,
          name: "Atkinson Bevis Ashton",
          phone: "+7 (607) 271-63-15",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 19371,
          name: "Sonia Hicks",
          phone: "+7 (135) 155-21-74",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 13965,
          name: "Payne Wade Macy",
          phone: "+7 (873) 619-55-37",
          room_type: 1,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 58763,
          name: "Cobb Gil Jorden",
          phone: "+7 (661) 214-62-57",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 40559,
          name: "Stella Crosby",
          phone: "+7 (786) 867-64-55",
          room_type: 3,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 97955,
          name: "Ewing Luke Sara",
          phone: "+7 (806) 215-01-53",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 86130,
          name: "Joyner Molly Fitzgerald",
          phone: "+7 (081) 251-83-32",
          room_type: 3,
          sex: "М",
          payment: false
        },
        {
          tgId: 40403,
          name: "Conner Ocean Naomi",
          phone: "+7 (603) 404-75-14",
          room_type: 3,
          sex: "М",
          payment: false
        },
        {
          tgId: 23059,
          name: "Christopher Woodward",
          phone: "+7 (444) 673-16-22",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 68157,
          name: "Bush Charity Cedric",
          phone: "+7 (439) 204-25-07",
          room_type: 1,
          sex: "М",
          payment: true
        },
        {
          tgId: 90276,
          name: "Christen Miles",
          phone: "+7 (144) 574-94-11",
          room_type: 3,
          sex: "М",
          payment: true
        },
        {
          tgId: 24480,
          name: "Hendricks Jolie Ariel",
          phone: "+7 (411) 985-92-66",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 39820,
          name: "Morse Brittany Raja",
          phone: "+7 (337) 172-43-73",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 83609,
          name: "Orli Sweeney",
          phone: "+7 (167) 848-26-48",
          room_type: 3,
          sex: "М",
          payment: true
        },
        {
          tgId: 44052,
          name: "Walls Amena Angelica",
          phone: "+7 (923) 273-58-27",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 97051,
          name: "Doris Howard",
          phone: "+7 (816) 205-68-74",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 67517,
          name: "Brady Patterson",
          phone: "+7 (640) 272-21-67",
          room_type: 1,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 43160,
          name: "Larsen Tate Doris",
          phone: "+7 (582) 370-33-36",
          room_type: 3,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 93066,
          name: "Thane Estrada",
          phone: "+7 (412) 263-34-34",
          room_type: 1,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 10275,
          name: "Robert Abbott",
          phone: "+7 (873) 237-41-20",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 48502,
          name: "Marsh Blaze Rhea",
          phone: "+7 (034) 638-95-24",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 40903,
          name: "Kevyn Garner",
          phone: "+7 (027) 642-72-00",
          room_type: 1,
          sex: "М",
          payment: true
        },
        {
          tgId: 57363,
          name: "Bruno Sosa",
          phone: "+7 (482) 043-50-19",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 11939,
          name: "Cooley May Joseph",
          phone: "+7 (148) 748-15-88",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 64922,
          name: "Stacey Haley",
          phone: "+7 (731) 637-15-04",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 91595,
          name: "Raymond Holt",
          phone: "+7 (844) 218-33-53",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 40669,
          name: "Eliana Benton",
          phone: "+7 (127) 211-95-54",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 52216,
          name: "Fry Zia Fay",
          phone: "+7 (405) 051-43-73",
          room_type: 3,
          sex: "М",
          payment: true
        },
        {
          tgId: 82761,
          name: "Barrera Basia Harper",
          phone: "+7 (374) 734-24-87",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 84020,
          name: "Dean Hiram Nichole",
          phone: "+7 (228) 714-28-08",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 20279,
          name: "Mccormick Rigel Nelle",
          phone: "+7 (211) 017-15-46",
          room_type: 3,
          sex: "М",
          payment: true
        },
        {
          tgId: 44270,
          name: "Hanna Bowers",
          phone: "+7 (579) 728-48-40",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 74496,
          name: "Shea Harmon",
          phone: "+7 (246) 251-85-14",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 44316,
          name: "Rae Rush",
          phone: "+7 (424) 964-72-38",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 99918,
          name: "Wing Sexton",
          phone: "+7 (355) 569-33-90",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 40694,
          name: "Virginia Richmond",
          phone: "+7 (708) 948-29-55",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 19298,
          name: "Joel Turner",
          phone: "+7 (666) 358-15-26",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 51611,
          name: "Natalie Estes",
          phone: "+7 (994) 324-97-23",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 78363,
          name: "Fitzgerald Gardner",
          phone: "+7 (128) 235-75-34",
          room_type: 3,
          sex: "М",
          payment: false
        },
        {
          tgId: 54685,
          name: "Clemons Hoyt Vivian",
          phone: "+7 (175) 488-71-83",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 63935,
          name: "Frances Greer",
          phone: "+7 (875) 633-22-88",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 92321,
          name: "John Porter",
          phone: "+7 (632) 007-28-15",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 62621,
          name: "Brenna Mayo",
          phone: "+7 (664) 348-33-36",
          room_type: 3,
          sex: "М",
          payment: false
        },
        {
          tgId: 67793,
          name: "Victoria Peck",
          phone: "+7 (913) 398-48-34",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 81070,
          name: "Kamal Peterson",
          phone: "+7 (630) 305-85-84",
          room_type: 1,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 13458,
          name: "Catherine Carey",
          phone: "+7 (328) 423-16-42",
          room_type: 1,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 78151,
          name: "Melissa Foley",
          phone: "+7 (332) 875-77-39",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 55467,
          name: "Nadine Beach",
          phone: "+7 (205) 285-82-35",
          room_type: 1,
          sex: "М",
          payment: false
        },
        {
          tgId: 73574,
          name: "Simpson Sigourney Catherine",
          phone: "+7 (499) 485-49-16",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 55451,
          name: "Macy Knapp",
          phone: "+7 (255) 322-58-00",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 46802,
          name: "Matthews Rashad Aaron",
          phone: "+7 (625) 151-67-76",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 86317,
          name: "Lenore Hutchinson",
          phone: "+7 (802) 416-93-17",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 47705,
          name: "Rodriguez Lyle Myra",
          phone: "+7 (240) 627-21-13",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 82670,
          name: "Cantrell Lacota Thomas",
          phone: "+7 (546) 212-23-72",
          room_type: 2,
          sex: "М",
          payment: true
        },
        {
          tgId: 48391,
          name: "Owens Amela Leila",
          phone: "+7 (843) 276-12-83",
          room_type: 3,
          sex: "М",
          payment: false
        },
        {
          tgId: 87857,
          name: "Calvin Mcbride",
          phone: "+7 (168) 781-44-64",
          room_type: 1,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 20480,
          name: "Jolie Sykes",
          phone: "+7 (427) 168-49-11",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 19201,
          name: "Sylvester Henderson",
          phone: "+7 (084) 709-51-23",
          room_type: 2,
          sex: "Ж",
          payment: false
        },
        {
          tgId: 53598,
          name: "Kylynn Bolton",
          phone: "+7 (722) 827-47-88",
          room_type: 3,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 21458,
          name: "Hughes Arden Rhoda",
          phone: "+7 (231) 722-43-22",
          room_type: 2,
          sex: "Ж",
          payment: true
        },
        {
          tgId: 78764,
          name: "Blevins Daniel Baker",
          phone: "+7 (048) 962-32-25",
          room_type: 2,
          sex: "М",
          payment: false
        },
        {
          tgId: 24186,
          name: "Wells Barbara Mannix",
          phone: "+7 (310) 106-41-43",
          room_type: 1,
          sex: "Ж",
          payment: true
        }
      ]
      this.loading = false
    }, 200)
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавление' : 'Изменение'
    },
  },
  methods: {
    updateItem(item) {
      if (item.payment) {
        this.$store.dispatch('pushLog', {text: `Объект с id ${item.tgId} был помечен как заплативший`, color: COLORS.success, icon: ICONS.success})
      } else {
        this.$store.dispatch('pushLog', {text: `Объект с id ${item.tgId} был помечен как незаплативший`, color: COLORS.error, icon: ICONS.error})
      }
      console.log(item)
    },
    getPrice(type) {
      switch (type) {
        case 1:
          return 3500
        case 2:
          return 4500
        case 3:
          return 6000
      }
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.$store.dispatch('pushLog', {text: `Item with id ${this.editedItem.tgId} was deleted`, color: COLORS.warning, icon: ICONS.warning})
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      this.$store.dispatch('pushLog', {text: `Item with id ${this.editedItem.tgId} was saved`, color: COLORS.success, icon: ICONS.success})

      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
}
</script>

<style scoped>

</style>
