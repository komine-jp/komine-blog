export default function () {
  return {
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal: (total: any) => `共 ${total} 条`,
  }
}