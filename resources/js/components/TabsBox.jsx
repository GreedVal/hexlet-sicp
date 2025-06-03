import React, { useEffect } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Editor from './Editor.jsx'
import Output from './Output.jsx'
import Tests from './Tests.jsx'
import TeacherSolution from './TeacherSolution.jsx'
import tabNames from '../common/tabNamesMap.js'
import { changeTab } from '../slices/tabsBoxSlice.js'
import locationMap from '../common/hashLocationMap.js'

const TabsBox = () => {
  const { t } = useTranslation()
  const { currentTab } = useSelector(state => state.tabsBox)
  const dispatch = useDispatch()

  useEffect(() => {
    const location = window.location.hash
    if (locationMap[location]) {
      dispatch(changeTab({ newActiveTab: `${locationMap[location]}` }))
    }
  }, [dispatch])

  const changeActiveTab = (newActiveTab) => {
    dispatch(changeTab({ newActiveTab }))
  }

  return (
    <Tab.Container activeKey={currentTab} onSelect={changeActiveTab}>
      <Nav variant="tabs" className="justify-content-center">
        {Object.values(tabNames).map(tabName => (
          <Nav.Item key={tabName}>
            <Nav.Link
              className="border-top-0 rounded-0"
              eventKey={tabName}
              href={`#${tabName}`}
            >
              {t(tabName)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content className="flex-grow-1 overflow-auto x-vh-75">
        <Tab.Pane eventKey={tabNames.editor} bsPrefix="tab-pane h-100 w-100">
          <Editor />
        </Tab.Pane>
        <Tab.Pane eventKey={tabNames.output} bsPrefix="tab-pane h-100 w-100">
          <Output />
        </Tab.Pane>
        <Tab.Pane eventKey={tabNames.tests} bsPrefix="tab-pane h-100 w-100">
          <Tests />
        </Tab.Pane>
        <Tab.Pane eventKey={tabNames.teacherSolution} bsPrefix="tab-pane h-100 w-100">
          <TeacherSolution />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  )
}

export default TabsBox
