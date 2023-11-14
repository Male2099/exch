<script>

export default {
    props: {
        'countCustomer': Number,
        'countTodayOrder': Number,
        'countTodaySold': Number,
        'todayRevenue': Number
    }
}
</script>

<template>
    <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="widget widget-stats bg-dark">
                <div class="stats-icon stats-icon-lg"><i class="fa fa-folder fa-fw"></i></div>
                <div class="stats-content">
                    <div class="stats-title">TODAY'S ORDERS</div>
                    <div class="stats-number">{{ countTodayOrder }}</div>
                    <div class="stats-progress progress">
                        <div class="progress-bar" style="width: 100%;"></div>
                    </div>
                    <!-- <div class="stats-desc">Better than last week (70.1%)</div> -->
                </div>
            </div>
        </div>
        <!-- END col-3 -->
        <!-- BEGIN col-3 -->
        <div class="col-xl-3 col-md-6">
            <div class="widget widget-stats bg-dark">
                <div class="stats-icon stats-icon-lg"><i class="fa fa-dollar-sign fa-fw"></i></div>
                <div class="stats-content">
                    <div class="stats-title">TODAY'S REVENUE</div>
                    <div class="stats-number">{{ todayRevenue }}</div>
                    <div class="stats-progress progress">
                        <div class="progress-bar" style="width: 100%;"></div>
                    </div>
                    <!-- <div class="stats-desc">Better than last week (40.5%)</div> -->
                </div>
            </div>
        </div>
        <!-- END col-3 -->
        <!-- BEGIN col-3 -->
        <div class="col-xl-3 col-md-6">
            <div class="widget widget-stats bg-dark">
                <div class="stats-icon stats-icon-lg"><i class="fa fa-archive fa-fw"></i></div>
                <div class="stats-content">
                    <div class="stats-title">TODAY'S SOLD</div>
                    <div class="stats-number">{{ countTodaySold }}</div>
                    <div class="stats-progress progress">
                        <div class="progress-bar" style="width: 100%;"></div>
                    </div>
                    <!-- <div class="stats-desc">Better than last week (76.3%)</div> -->
                </div>
            </div>
        </div>
        <!-- END col-3 -->
        <!-- BEGIN col-3 -->
        <div class="col-xl-3 col-md-6">
            <div class="widget widget-stats bg-dark">
                <div class="stats-icon stats-icon-lg">
                    <!-- <i class="fa fa-comment-alt fa-fw"></i> -->
                    <i class="fa-solid fa-id-badge"></i>

                </div>
                <div class="stats-content">
                    <div class="stats-title">TOTAL CUSTOMERS</div>
                    <div class="stats-number">{{ countCustomer }}</div>
                    <div class="stats-progress progress">
                        <div class="progress-bar" style="width: 100%;"></div>
                    </div>
                    <!-- <div class="stats-desc">Better than last week (54.9%)</div> -->
                </div>
            </div>
        </div>
    </div>
</template>