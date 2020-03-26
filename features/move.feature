#language: ru
Функционал: Крестики нолики

    Сценарий: Ход игрока
        Дано пустое поле
        И ходит игрок 1
        Если игрок ходит в клетку 1, 1
        То поле становится "100|000|000"
        И ходит игрок 1
        Если игрок ходит в клетку 2, 2
        И ходит игрок 1
        То поле становится "100|010|000"
        И ходит игрок 1
        Если игрок ходит в клетку 1, 3
        То поле становится "100|010|100"


  Сценарий: Ход игрока в заполненную клетку
        Дано поле "100|200|102"
        И ходит игрок 1
        Если игрок ходит в клетку 1, 2        
        И поле становится "100|200|102"
        Если игрок ходит в клетку 2, 2
        То поле становится "100|210|102"
               

  Сценарий: определение победителя по вертикали
    Дано поле "102|120|002"
    И ходит игрок 1
    Если игрок ходит в клетку 1, 3
    То поле становится "000|000|000"  
    И победил игрок 1 