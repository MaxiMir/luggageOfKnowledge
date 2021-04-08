# GIT FLOW #

```shell
# Первый шаг рабочего процесса заключается в создании ветки develop от стандартной ветки master.
$ git branch develop git push -u origin develop
# Создание функциональной ветки
$ git checkout develop git checkout -b feature_branch 
# По завершении работы над функцией следует объединить ветку feature_branch с develop.
$ git checkout develop git merge feature_branch
# Создание ветки выпуска (release)
$ git checkout develop git checkout -b release/0.1.0
# Когда релиз готов к отправке, он сливается в master и develop, а ветка release удаляется. 
$ git checkout master git merge release/0.1.0 
# Ветки hotfix используются для быстрого внесения исправлений в рабочие релизы.
$ git checkout master git checkout -b hotfix_branch 
# По завершении работы ветка hotfix, так же как и в случае с веткой release, объединяется с master и develop.
$ git checkout master git merge hotfix_branch git checkout develop git merge hotfix_branch git branch -D hotfix_branch
```
